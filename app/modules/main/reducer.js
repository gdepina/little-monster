import t from './actionTypes';
import {NET_INFO_CHANGED} from 'react-native-redux-listener';

let initialState = {isConnected: false, data: [], plan: {}, currentMovie: null, comments: [], likes: []};

const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case NET_INFO_CHANGED:
            state = Object.assign({}, state, {isConnected: action.isConnected,});
            return state;

        case t.LOAD_PLAN_SUCCESS:
            state = Object.assign({}, state, {plan: action.payload});
            return state;

        case t.LOAD_MIXES_SUCCESS:
            state = Object.assign({}, state, {mixes: action.payload});
            return state;

        case t.CLEAN_PLAN:
            state = Object.assign({}, state, {plan: {}});
            return state;

        case t.LOAD_COMMENTS_SUCCESS:
            state = Object.assign({}, state, {comments: action.payload});
            return state;

        case t.LOAD_LIKE_MOVIE:
            const found = state.likes.find((element) => element === action.payload);
            if (!found) {
                return Object.assign({}, state, {
                    likes: [
                        ...state.likes,
                        action.payload
                    ]
                });
            }
            return state;

        case t.LOAD_CURRENT_MATCH_SUCCESS:
            state = Object.assign({}, state, {currentMovie: action.payload});
            return state;

        case t.ADD_MATCH_SUCCESS:
            const currentMovie = action.payload in state.movies ? state.movies[action.payload] : null;
            state = Object.assign({}, state, {currentMovie});
            return state;


        default:
            return state;
    }
};


export default moviesReducer;
