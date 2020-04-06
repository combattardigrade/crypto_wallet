export const API = 'http://genesisblock.ddns.net:3000/api'
const MAPBOX_DIRECTIONS_API = 'https://api.mapbox.com/directions/v5/mapbox/walking/'
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiY29tYmF0dGFyZGlncmFkZSIsImEiOiJjanJsOXJqeDYwNmFkM3ltdXdmdG5kOTFqIn0.C14U4oY3yTlrtX_2mDFlCQ'

export function login(params) {
    return fetch(API + '/login', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function signup(params) {
    return fetch(API + '/signup', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function getUserData(params) {
    return fetch(API + '/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getTxs(params) {
    return fetch(API + '/txs', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getRankings(params) {
    return fetch(API + '/rankings', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}


