import {loadUserProfileData} from "../data-access/userProfileDataAccess"
import * as cookieManager from './cookieManager.js'

export const  loadUserProfile = (onCompleteFunc, onErrorFunc) => {

    loadUserProfileData((response) => {
            if (response == null){
                if (onErrorFunc == null){
                    return;
                }

                onErrorFunc("No data was provided from get user profile");
                return;
            }

            cookieManager.setUserId(response.participant_id);
            cookieManager.setDomainName(response.domain_name);
            cookieManager.setDisplayName(response.display_name);
            cookieManager.setUserTypeId(response.subscription_type_id);
            cookieManager.setFirstName(response.first_name);
            cookieManager.setIsAdministrator(response.is_administrator);
            cookieManager.setRegionId(response.region_id);

            onCompleteFunc();
        }, onErrorFunc);
}