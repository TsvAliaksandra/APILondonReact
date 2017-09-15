export default {
    myGet:function (url) {
        return new Promise(function (resolve, reject) {
            let req = new XMLHttpRequest();
            req.onload = ()=>{
                let response = req.response;
                resolve(response);
            };
            req.onerror= ()=>{
                reject(req.status);
            };
            req.open("GET",url,true);
            req.responseType = "json";
            req.send();
        })
    }
}