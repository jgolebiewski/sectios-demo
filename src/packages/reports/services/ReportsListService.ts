import { getBaseUrl, HttpClient } from '../../../core/HttpClient';
import { Report } from '../../domain/Report';

const getReports = async (): Promise<Report[]> => {
    const response = await HttpClient.get(getBaseUrl() + 'api/reports');
    return response.data;
};

export const ReportsListService = {
    getReports,
};
