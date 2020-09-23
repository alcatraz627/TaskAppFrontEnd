
const _TOKEN_KEY = 'AUTH_TOKEN'

export function setToken(token) {
    localStorage.setItem(_TOKEN_KEY, token)
}

export function getToken() {
    return localStorage.getItem(_TOKEN_KEY)
} 

export function deleteToken() {
    localStorage.removeItem(_TOKEN_KEY)
} 