import t from './actionTypes';
import { NET_INFO_CHANGED } from 'react-native-redux-listener';

let initialState = { isConnected: false, data: [], movies: [], currentMovie: null };

const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case NET_INFO_CHANGED:
            state = Object.assign({}, state, {isConnected: action.isConnected,});
            return state;

        case t.LOAD_MATCHES_SUCCESS:
            state = Object.assign({}, state, {movies: action.payload });
            return state;

        case t.LOAD_CURRENT_MATCH_SUCCESS:
            state = Object.assign({}, state, {currentMovie: action.payload });
            return state;

        case t.ADD_MATCH_SUCCESS:
            const currentMovie = action.payload in state.movies ? state.movies[action.payload]: null;
            state = Object.assign({}, state, { currentMovie });
            return state;


        default:
            return state;
    }
};


export default moviesReducer;
