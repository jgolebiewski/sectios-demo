import { HttpClient, getBaseUrl } from '../../../core/HttpClient';
import { DraftReport } from '../domain/types';

const saveReport = (report: DraftReport) => {
    return HttpClient.post(getBaseUrl() + 'api/draft-reports', report).catch(() => 'Error occurred.');
};

export const ReportCreatorService = {
    saveReport,
};
