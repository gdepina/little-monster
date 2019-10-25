import actionType from './actionTypes';
import * as api from './api';

export function getPlan(options) {
    return dispatch => {
        dispatch({
            type: actionType.LOAD_PLAN_REQUEST
        })
        api.getPlan(options)
            .then(res => {
                dispatch({
                    type: actionType.LOAD_PLAN_SUCCESS,
                    payload: res,
                })
            })
            .catch(error => {
                dispatch({
                    type: actionType.LOAD_PLAN_FAILED,
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

export function createInvest(name, orgId, matchSize, courtType, location, datetime, locationName, players, phoneNumber) {
    return dispatch => {
        dispatch({
            type: actionType.ADD_MATCH_REQUEST
        })
        const result = api.addMatch(name, orgId, matchSize, courtType, location, datetime, locationName, players, phoneNumber)
        result.prom
            .then(() => {
                loadMatchs(result.key)(dispatch) //refresh the data to keep up-to-date
            })
            .catch(error => {
                dispatch({
                    type: actionType.ADD_MATCH_FAILED,
                    payload: error
                })
            })
    }
}
