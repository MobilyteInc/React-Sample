import {callFetch} from './common/commonDataAccess'
import {getPlatformUriPath, uploadFile, getApiHeadersWithToken} from '../data-managers/urlManager'

export const Regions = ( onCompleteFunc, onErrorFunc) => {
	callFetch(getPlatformUriPath('Regions'), 'GET', 200, null,  {'Content-Type': 'application/json'} , onCompleteFunc, onErrorFunc);
}

export const Languages = (onCompleteFunc, onErrorFunc) => {
	callFetch(getPlatformUriPath('Languages'), 'GET', 200, null,  {'Content-Type': 'application/json'}, onCompleteFunc, onErrorFunc);
}