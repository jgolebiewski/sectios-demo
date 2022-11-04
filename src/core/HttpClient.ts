import axios from 'axios';

export const getBaseUrl = () => {
    return process.env.REACT_APP_API;
};

export const HttpClient = {
    get: axios.get,
    post: axios.post,
    delete: axios.delete,
    patch: axios.patch,
};
