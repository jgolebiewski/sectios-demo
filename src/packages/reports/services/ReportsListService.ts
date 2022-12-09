import { getBaseUrl, HttpClient } from '../../../core/HttpClient';
import { Response } from '../../../core/types';
import { Report } from '../../../domain/Report';

const getReports = (): Promise<Response<Report>> => {
    return HttpClient.get(getBaseUrl() + 'api/reports').then((response) => {
        return { data: response.data };
    });
};

export const ReportsListService = {
    getReports,
};
