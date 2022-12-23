import { HttpClient, getBaseUrl } from '../../../core/HttpClient';
import { EntityResponse } from '../../../core/types';
import { Report } from '../../../domain/Report';

const getReport = (id: string): Promise<EntityResponse<Report>> => {
    return HttpClient.get(getBaseUrl() + 'api/reports/' + id).then((response) => {
        return { data: response.data };
    });
};

export const ReportService = {
    getReport,
};
