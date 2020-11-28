export const URL_BACK_FLASK = 'https://backflaskgrupo4.herokuapp.com/';
// export const URL_BACK = 'http://127.0.0.1:5000/';
export const URL_BACK_DJANGO = 'https://backdjangogrupo4.herokuapp.com/API/';
// export const URL_BACK_DJANGO = 'http://127.0.0.1:8000/API/';

export const FetchGet = async (url, endpoint) => {
    const response = await fetch(url + endpoint);
    const content = await response.json();
    return content.content;
   
}

export const FetchConf = async (url, endpoint, method, data) => {

    const config = {
        method: method,
        body: JSON.stringify(data),
        headers: {'Content-type':'application/json'}
    }
    const response = await fetch(url + endpoint, config);
    console.log(response)
    const content = await response.json();
    return content.content;
   
}

export const FetchDel = async (url, endpoint) => {

    const config = {
        method: 'DELETE'
    }

    const response = await fetch(url + endpoint, config);
    const content = await response.json();
    return content.content;
   
}

export const FetchGetToken = async (url, endpoint, token) => {

    const config = {
        method: 'GET',
        headers: {
                    'Content-type':'application/json',
                    'Authorization' : `Bearer ${token}`
                 }
    }
    const response = await fetch(url + endpoint, config);
    const content = await response.json();
    console.log(content)
    return content.content; 
}


export const FetchConfToken = async (url, endpoint, method, data, token) => {

    const config = {
        method: method,
        body: JSON.stringify(data),
        headers: {
                    'Content-type':'application/json',
                    'Authorization' : `Bearer ${token}`
                 }
    }
  
    const response = await fetch(url + endpoint, config);
    const content = await response.json();
    return content; 
}


