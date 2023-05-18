import { HttpClient, getBaseUrl } from '../../../core/HttpClient';
import { EntityResponse } from '../../../core/types';
import { Report } from '../../domain/Report';

const getReport = async (id: string): Promise<EntityResponse<Report>> => {
    const response = await HttpClient.get(getBaseUrl() + 'api/reports/' + id);
    return { data: response.data };
};

export const ReportService = {
    getReport,
};
