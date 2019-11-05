import {callFetch} from '../common/commonDataAccess'
import {getPlatformUriPath, getApiHeadersWithToken} from '../../data-managers/urlManager'

export const regionEditById = (regionId, data, onCompleteFunc, onErrorFunc) => {
	callFetch(getPlatformUriPath('Regions/'+regionId),//+'?langId='+langid),
		'PATCH', 200, data, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}