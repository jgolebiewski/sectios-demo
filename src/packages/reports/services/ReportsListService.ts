import { getBaseUrl, HttpClient } from '../../../core/HttpClient';
import { Report } from '../../domain/Report';

const getReports = async (): Promise<Report[]> => {
    const response = await HttpClient.get(getBaseUrl() + 'api/reports').catch(() => ({
        data: [],
    }));
    return response.data as Report[];
};

export const ReportsListService = {
    getReports,
};
