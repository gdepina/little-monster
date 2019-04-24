import actionType from './actionTypes';
import * as api from './api';

export function loadMovies(search) {
    return dispatch => {
        dispatch({
            type: actionType.LOAD_MATCHES_REQUEST
        })
        api.getMovies(search)
            .then(res => {
                dispatch({
                    type: actionType.LOAD_MATCHES_SUCCESS,
                    payload: res,
                })
            })
            .catch(error => {
                dispatch({
                    type: actionType.LOAD_MATCHES_FAILED,
                    payload: error
                })
            })
    }
}

export function loadMovie(key) {
    return dispatch => {
        dispatch({
            type: actionType.LOAD_MATCHES_REQUEST
        })
        api.getMovie(key)
            .then(res => {
                dispatch({
                    type: actionType.LOAD_CURRENT_MATCH_SUCCESS,
                    payload: res,
                })
            })
            .catch(error => {
                dispatch({
                    type: actionType.LOAD_MATCHES_FAILED,
                    payload: error
                })
            })
    }
}

export function loadComments(userId) {
    return dispatch => {
        dispatch({
            type: actionType.LOAD_MATCHES_REQUEST
        })
        api.getComments(userId)
            .then(res => {
                dispatch({
                    type: actionType.LOAD_COMMENTS_SUCCESS,
                    payload: res,
                })
            })
            .catch(error => {
                dispatch({
                    type: actionType.LOAD_MATCHES_FAILED,
                    payload: error
                })
            })
    }
}


export function like(opt) {
    return dispatch => {
        dispatch({
            type: actionType.ADD_MATCH_REQUEST
        })
        api.like(opt)
            .then((res) => {
                console.log(res);
                loadMovie(res.omdbId)(dispatch) //refresh the data to keep up-to-date
            })
            .catch(error => {
                dispatch({
                    type: actionType.ADD_MATCH_FAILED,
                    payload: error
                })
            })
    }
}


export function addPlayerToMatch(matchId, playerId, email, displayName) {
    return dispatch => {
        api.addPlayerItem(matchId, playerId, email, displayName)
            .then(() => {
                loadMatchs(matchId)(dispatch);
            })
            .catch(error => {
                dispatch({
                    type: actionType.ADD_MATCH_FAILED,
                    payload: error
                })
            })
    }
}

export function removePlayerFromMatch(matchId, playerId) {
    return dispatch => {
        api.removePlayerItem(matchId, playerId)
            .then(() => {
                loadMatchs(matchId)(dispatch);
            })
            .catch(error => {
                dispatch({
                    type: actionType.ADD_MATCH_FAILED,
                    payload: error
                })
            })
    }
}

export function destroyMatch(matchId) {
    return dispatch => {
        api.destroyMatch(matchId)
            .then(() => {
                loadMatchs()(dispatch);
            })
            .catch(error => {
                dispatch({
                    type: actionType.ADD_MATCH_FAILED,
                    payload: error
                })
            })
    }
}
