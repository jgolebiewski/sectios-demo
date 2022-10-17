import { HttpClient, getBaseUrl } from '../HttpClient';
import { Country, MeanOfTransport, Response } from '../types';

const getCountries = (): Promise<Response<Country>> => {
    return HttpClient.get(getBaseUrl() + 'api/countries').then((response) => {
        const data = response.data;
        return { data: data.countries };
    });
};

const getMeansOfTransport = (): Promise<Response<MeanOfTransport>> => {
    return HttpClient.get(getBaseUrl() + 'api/means-of-transport').then((response) => {
        const data = response.data;
        return { data: data.meansOfTransport };
    });
};

export const DataService = {
    getCountries,
    getMeansOfTransport,
};
