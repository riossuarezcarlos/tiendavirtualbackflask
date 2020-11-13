import {FetchGet, FetchConf, FetchDel} from '../BackConfig';

export const getCategories = async () => {
    return await FetchGet(`category`);
}

export const getCategoriesbyId = async (categoryId) => {
    return await FetchGet(`category/${categoryId}`);
}

export const createCategory = async (data) => {
    return await FetchConf(`category`, 'POST', data);
}

export const updateCategory = async (data, categoryId) => {
    return await FetchConf(`category/${categoryId}`, 'PUT', data);
}

export const deleteCategory = async (categoryId) => {
    console.log(categoryId)
    return await FetchDel(`category/${categoryId}`, 'DELETE');
}

 