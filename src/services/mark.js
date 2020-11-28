import {URL_BACK_FLASK, FetchGet, FetchConf, FetchDel} from '../BackConfig';

export const getMarks = async () => {
    return await FetchGet(URL_BACK_FLASK, `mark`);
}

export const getMarkbyId = async (markId) => {
    return await FetchGet(URL_BACK_FLASK, `mark/${markId}`);
}

export const createMark = async (data) => {
    return await FetchConf(URL_BACK_FLASK, `mark`, 'POST', data);
}

export const updateMark = async (data, markId) => {
    return await FetchConf(URL_BACK_FLASK, `mark/${markId}`, 'PUT', data);
}

export const deleteMark = async (markId) => {
    return await FetchDel(URL_BACK_FLASK, `mark/${markId}`, 'DELETE');
}

 