import {callFetch} from './common/commonDataAccess'
import {getIdentityUriPath} from '../data-managers/urlManager'

export const getUserLogin = (email, password, onCompleteFunc, onErrorFunc) => {

    const data = new URLSearchParams();
    data.append("client_id", "www");
    data.append("client_secret", "react-www");
    data.append("grant_type", "password");
    data.append("scope", "react openid profile");
    data.append("username", email);
    data.append("password", password);

    callFetch(getIdentityUriPath('connect/token'), 'POST', 200, data, { 'Content-Type': 'application/x-www-form-urlencoded'}, onCompleteFunc, onErrorFunc, false);
}
