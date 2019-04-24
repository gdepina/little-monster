import axios from 'axios';

import firebase from "../../config/firebase";
import { API_URL } from "../../config/constants";

const database = firebase.database();
import matchModel from '../../models/match'
import playerModel from '../../models/player'

export async function getMovies(search) {
    let url = `${API_URL}/movies`;
    if (search) url += `?s=${search}`;
    let response = await axios.get(url);
    return response.data;
}
// get specified section
export async function getMovie(movieId) {
    let url = `${API_URL}/movies/${movieId}`;
    let response = await axios.get(url);
    return response.data;
}


// add new section
export function addMatch(name, orgId, matchSize, courtType, location, datetime, locationName, players, phoneNumber) {
    let key = database.ref('/match').push().key
    let model = matchModel(key, name, firebase.database.ServerValue.TIMESTAMP, orgId, matchSize, courtType, location, datetime, locationName, players, phoneNumber)
    return { prom: database.ref('/match/'+ key).set(model), key}
}


export function addPlayerItem(matchId, playerId, email, displayName) {
    return new Promise((resolve, reject) => {
        database.ref(`/match/${matchId}/players`).once('value').then((player) => {
            let players = player.val() || [];
            players.push(playerModel(playerId, email, displayName))
            database.ref(`/match/${matchId}/players`).set(players)
                .then( res => {resolve(res)})
                .catch( error => {reject(error)})
        })
    })
}

export function removePlayerItem(matchId, playerId) {
    return new Promise((resolve, reject) => {
        database.ref(`/match/${matchId}/players`).once('value').then((player) => {
            let players = player.val() || [];
            const indexPlayer = players.findIndex(player => player.id === playerId);
            players.splice(indexPlayer, 1);
            database.ref(`/match/${matchId}/players`).set(players)
                .then( res => {resolve(res)})
                .catch( error => {reject(error)})
        })
    })
}

export function destroyMatch(matchId) {
    return database.ref(`/match/${matchId}`).remove()
}

