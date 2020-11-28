import {URL_BACK_FLASK, FetchGet, FetchConf, FetchDel} from '../BackConfig';

export const getCategories = async () => {
    return await FetchGet(URL_BACK_FLASK, `category`);
}

export const getCategoriesbyId = async (categoryId) => {
    return await FetchGet(URL_BACK_FLASK, `category/${categoryId}`);
}

export const createCategory = async (data) => {
    return await FetchConf(URL_BACK_FLASK, `category`, 'POST', data);
}

export const updateCategory = async (data, categoryId) => {
    return await FetchConf(URL_BACK_FLASK, `category/${categoryId}`, 'PUT', data);
}

export const deleteCategory = async (categoryId) => {
    return await FetchDel(URL_BACK_FLASK, `category/${categoryId}`, 'DELETE');
}

 