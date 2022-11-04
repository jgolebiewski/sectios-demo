import { HttpClient, getBaseUrl } from '../../../core/HttpClient';
import { Report } from '../machines/reportCreator.machine';

const saveReport = (report: Report) => {
    return HttpClient.post(getBaseUrl() + 'api/reports', report);
};

export const ReportCreatorService = {
    saveReport,
};
