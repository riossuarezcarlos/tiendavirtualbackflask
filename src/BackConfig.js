export const URL_BACK = 'http://127.0.0.1:5000/';

export const FetchGet = async (endpoint) => {
    const response = await fetch(URL_BACK + endpoint);
    const content = await response.json();
    return content.content;
   
}

export const FetchConf = async (endpoint, method, data) => {

    const config = {
        method: method,
        body: JSON.stringify(data),
        headers: {'Content-type':'application/json'}
    }

    const response = await fetch(URL_BACK + endpoint, config);
    const content = await response.json();
    return content.content;
   
}

export const FetchDel = async (endpoint) => {

    const config = {
        method: 'DELETE'
    }

    const response = await fetch(URL_BACK + endpoint, config);
    const content = await response.json();
    return content.content;
   
}