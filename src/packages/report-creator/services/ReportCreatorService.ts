import { HttpClient, getBaseUrl } from '../../../core/HttpClient';
import { Report } from '../../../domain/Report';

const saveReport = (report: Report) => {
    return HttpClient.post(getBaseUrl() + 'api/reports', report).catch(() => 'Error occurred.');
};

export const ReportCreatorService = {
    saveReport,
};
