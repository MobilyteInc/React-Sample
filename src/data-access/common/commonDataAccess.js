export const callFetch = (url, verb, success, data, headers, onCompleteFunc, onErrorFunc, stringifyData=true) => {

    var attributes ={
        method: verb
    };

    let successCall = true;

    if (headers != null) {
        attributes.headers = headers;
    }

    if (data != null) {
        if (stringifyData){
            attributes.body = JSON.stringify(data);
        } else {
            attributes.body = data;
        }
    }

    fetch(url, attributes).then(function(response) {
            
            if (response.status !== success){               
                successCall = false;                
            }
            if (response.status === 204 || attributes.method == 'PATCH'){               
                return {status: response.status};                
            }
            if(attributes.method == 'DELETE')
            {return null;}
            
            return response.json();
    }).then(function(response) {
        if(!successCall)
        {
            return onErrorFunc(response);
        }

        if (onCompleteFunc == null)
        { return; }
        onCompleteFunc(response);
        
    }).catch(
        e => console.log('catch', e)
    );
}
