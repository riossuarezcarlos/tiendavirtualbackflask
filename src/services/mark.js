import {FetchGet, FetchConf, FetchDel} from '../BackConfig';

export const getMarks = async () => {
    return await FetchGet(`mark`);
}

export const getMarkbyId = async (markId) => {
    return await FetchGet(`mark/${markId}`);
}

export const createMark = async (data) => {
    return await FetchConf(`mark`, 'POST', data);
}

export const updateMark = async (data, markId) => {
    return await FetchConf(`mark/${markId}`, 'PUT', data);
}

export const deleteMark = async (markId) => {
    return await FetchDel(`mark/${markId}`, 'DELETE');
}

 