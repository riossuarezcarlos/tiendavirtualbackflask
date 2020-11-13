import {URL_BACK} from '../BackConfig';
 
export const getLabels = async () => {

    const response = await fetch(`${URL_BACK}/label`);
    const content = await response.json();
    console.log(content.content)
    return content.content;
   
}

export const getLabelbyId = async (labelId) => {

    const response = await fetch(`${URL_BACK}/label/${labelId}`);
    const content = await response.json();
    console.log(content.content)
    return content.content;
   
}

export const createLabel = async (data) => {

    const config = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-type':'application/json'}
    }

    const response = await fetch(`${URL_BACK}/label`, config);
    const content = await response.json();
    return(content.content);
}

export const updateLabel = async (data, labelId) => {

    const config = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {'Content-type':'application/json'}
    }

    const response = await fetch(`${URL_BACK}/label/${labelId}`, config);
    const content = await response.json();
    return(content.content);
}


export const deleteLabel = async (labelId) => {

    const config = {
        method: 'DELETE'
    }

    const response = await fetch(`${URL_BACK}/label/${labelId}`, config);
    const content = await response.json();
    return(content.content);
}
