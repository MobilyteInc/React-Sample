import {getAuthToken} from './cookieManager.js'

const IdentityUri = "https://localhost:44326/";
const PlatformUri = "http://localhost:44326/api/";


export const getIdentityUriPath = (path) => {
    return IdentityUri + path;
}

export const getPlatformUriPath = (path) => {
    return PlatformUri + path;
}

export const getApiHeaders = () => ({
    'Content-Type':'application/json',
    'cache-control':'no-cache',
    'pragma':'no-cache',
    'Authorization':'bearer ' + getAuthToken()
});

export const getApiHeadersWithToken = () => ({
    'Content-Type':'application/json',
    'Authorization':'bearer ' + getAuthToken()
});

export const uploadFile = () => ({
    'Authorization':'bearer ' + getAuthToken()
});
