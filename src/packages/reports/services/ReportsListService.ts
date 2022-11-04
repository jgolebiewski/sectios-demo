import { getBaseUrl, HttpClient } from '../../../core/HttpClient';

const getReports = () => {
    return HttpClient.get(getBaseUrl() + 'api/reports').then((response) => {
        return response.data;
    });
};

export const ReportsListService = {
    getReports,
};
