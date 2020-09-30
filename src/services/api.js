import axios from 'axios'

import { HTTP_METHODS, baseURL } from '../constants'

// import store from '../utils/store'
import {getToken} from './localstorage'

export default async function apiCall({ url, method = HTTP_METHODS.GET, payload = {} }) {
    // const state = store.getState()
    // let { token, token_type } = state.user;
    // // console.log(state.user)
    // let headers = {}

    // // TODO: Fix Axios issue with headers not being embedded.
    // if (token) {
    //     console.log("Adding token", token);
    //     // headers = { ...headers, 'Authorization': `${token_type} ${token}`, 'Hosted': 'localhost:8100' }
    // }

    console.log(`Making req to [${method}]${url} with payload `, payload)

    // Artificial delay for testing purpose
    // await new Promise(r => setTimeout(r, 1000)).then(r => r)

    const resp = await axios({
        baseURL,
        url,
        method,
        headers: { 'Authorization': `Bearer ${getToken()}` },
        data: payload,
        validateStatus: status => status < 500,
    }).then(resp => {
        // console.log(resp);
        return resp;
    }).catch((error) => {
        console.log("Axios error", error.toJSON())
        return error;
    })

    return resp;
}
