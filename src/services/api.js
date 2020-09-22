import { request } from 'axios'

import { HTTP_METHODS, baseURL } from '../constants'

export default async function apiCall({ url, method = HTTP_METHODS.GET, payload = {} }) {
    console.log(`Making req to [${method}}]${url} with payload `, payload)
    const resp = await request({
        baseURL,
        url,
        method,
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
