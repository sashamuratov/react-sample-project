import $ from 'jquery'; 
export function request(method,url,data,contentType = 'application/json', withCredentials) {
    return new Promise(function(resolve, reject){
        $.ajax({
            method: method,
            data: data,
            url: url,
            contentType: contentType,
            cache: false,
            processData: false,
            success: function(response){
                resolve(response);
            },
            error: function(err){
                reject(err);
            }
        });
    });
}

export function getQueryVariable(queryString, variable) {
    queryString = queryString.substr(1, queryString.length-1);
    var vars = queryString.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return false;
}