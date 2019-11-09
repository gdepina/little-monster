import actionType from './actionTypes';
import * as api from './api';

export function getPlan(options, cb) {
    return dispatch => {
        dispatch({
            type: actionType.LOAD_PLAN_REQUEST
        })
        api.getPlan(options)
            .then(res => {
                dispatch({
                    type: actionType.LOAD_MIXES_SUCCESS,
                    payload: res,
                })
            })
            .then(() => {
                cb()
            })
            .catch(error => {
                dispatch({
                    type: actionType.LOAD_PLAN_FAILED,
                    payload: error
                })
                cb()
            })
    }
}

export function getPlanByUserId(userId, cb) {
    return dispatch => {
        dispatch({
            type: actionType.LOAD_PLAN_REQUEST
        })
        api.getInvestByUserId(userId)
            .then(res => {
                const purgedVal = res.val() ? Object.values(res.val())[0] : res.val();
                if  (res.val()) {
                    dispatch({
                        type: actionType.LOAD_PLAN_SUCCESS,
                        payload: purgedVal || {},
                    })
                }
            })
            .then(() => {
                cb()
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

export function cleanPlan() {
    return dispatch => {
        dispatch({
            type: actionType.CLEAN_PLAN
        })
    }
}

export function createInvest(userId, entry, cost, savings, risk, goal, initialDate, goalDate, desc, advice ) {
    return dispatch => {
        dispatch({
            type: actionType.ADD_INVEST_REQUEST
        })
        const result = api.addInvest({userId, entry, cost, savings, risk, goal, initialDate, goalDate, desc, advice});
        result.prom
            .then((res) => {
                // console.log(res)
                // loadMatchs(result.key)(dispatch) //refresh the data to keep up-to-date
            })
            .catch(error => {
                dispatch({
                    type: actionType.ADD_INVEST_FAILED,
                    payload: error
                })
            })
    }
}
