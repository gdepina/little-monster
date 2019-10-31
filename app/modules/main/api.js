import axios from 'axios';

import firebase from "../../config/firebase";
import {API_URL, BACK_API_URL} from "../../config/constants";

const database = firebase.database();
import investModel from '../../models/invest'


export async function getPlan(options) {
    const params = new URLSearchParams(options);

    let url = `${BACK_API_URL}?${params.toString()}`;
    let response = await axios.get(url);
    return response.data;
}

function convertDateToString(date) {
    const day = date.getDate();
    const month = date.getMonth(); //Be careful! January is 0 not 1
    var year = date.getFullYear();

    return (month + 1) + "-" + day + "-" + year;
}

// add new section
export function addInvest(options) {
    const {userId, entry, cost, savings, risk, goal, initialDate, goalDate, desc, advice} = options;
    let key = database.ref('/invest').push().key;
    let model = investModel(key, firebase.database.ServerValue.TIMESTAMP, userId, entry, cost, savings, risk, goal, convertDateToString(initialDate), convertDateToString(goalDate), desc, advice);
    return {prom: database.ref('/invest/' + key).set(model), key}
}

export function getInvestByUserId(userId) {
    return database.ref('/invest').orderByChild('userId').equalTo(userId).once('value');
}

export function removePlayerItem(matchId, playerId) {
    return new Promise((resolve, reject) => {
        database.ref(`/match/${matchId}/players`).once('value').then((player) => {
            let players = player.val() || [];
            const indexPlayer = players.findIndex(player => player.id === playerId);
            players.splice(indexPlayer, 1);
            database.ref(`/match/${matchId}/players`).set(players)
                .then(res => {
                    resolve(res)
                })
                .catch(error => {
                    reject(error)
                })
        })
    })
}

export function destroyMatch(matchId) {
    return database.ref(`/match/${matchId}`).remove()
}

