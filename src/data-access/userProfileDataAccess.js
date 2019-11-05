import {callFetch} from './common/commonDataAccess'
import {getParticipantUriPath, getApiHeaders} from '../data-managers/urlManager'

export const  loadUserProfileData = (onCompleteFunc, onErrorFunc) => {
	callFetch(getParticipantUriPath('accounts/profile'),
						'GET',
						200,
						null,
						getApiHeaders(),
						onCompleteFunc,
						onErrorFunc);
}