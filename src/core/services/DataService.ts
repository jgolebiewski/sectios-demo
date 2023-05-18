import { Accommodation, Country, MeanOfTransport } from '@reports/domain';
import { HttpClient, getBaseUrl } from '../HttpClient';
import { Response } from '../types';

let cachedCountries = new Set<Country>();
let cachedMeans = new Set<MeanOfTransport>();
let cachedAccommodations = new Set<Accommodation>();

const getCountries = (): Promise<Response<Country>> => {
    if (cachedCountries.size !== 0) {
        return new Promise((res, rej) => {
            res({ data: Array.from(cachedCountries) });
        });
    }

    return HttpClient.get(getBaseUrl() + 'api/countries').then((response) => {
        const data = response.data;
        cachedCountries = new Set(data);
        return { data };
    });
};

const getMeansOfTransport = (): Promise<Response<MeanOfTransport>> => {
    if (cachedMeans.size !== 0) {
        return new Promise((res, rej) => {
            res({ data: Array.from(cachedMeans) });
        });
    }

    return HttpClient.get(getBaseUrl() + 'api/means-of-transport').then((response) => {
        const data = response.data;
        cachedMeans = new Set(data);
        return { data };
    });
};

const getAccommodations = (): Promise<Response<Accommodation>> => {
    if (cachedAccommodations.size !== 0) {
        return new Promise((res, rej) => {
            res({ data: Array.from(cachedAccommodations) });
        });
    }
    return HttpClient.get(getBaseUrl() + 'api/accommodations').then((response) => {
        const data = response.data;
        cachedAccommodations = new Set(data);
        return { data };
    });
};

export const DataService = {
    getCountries,
    getMeansOfTransport,
    getAccommodations,
};
