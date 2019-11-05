import {getUserLogin} from "../data-access/userLoginDataAccess"
import {setEmail,setAuthToken} from './cookieManager'
import {loadUserProfile} from './userProfileManager'

export const  logUserIn = (email, password, onCompleteFunc, onErrorFunc) => {
    getUserLogin(email, password, (response) => {
                if (response == null){
                    onErrorFunc("An unknown error has occurred accessing the api");
                    return;
                }

                setEmail(email);
                setAuthToken(response.access_token);
                loadUserProfile(onCompleteFunc, onErrorFunc);
            }, onErrorFunc);
}