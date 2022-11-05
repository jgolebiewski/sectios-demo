import { HttpClient, getBaseUrl } from '../../../core/HttpClient';
import { DraftReport } from '../machines/reportCreator.machine';

const saveReport = (report: DraftReport) => {
    return HttpClient.post(getBaseUrl() + 'api/reports', report);
};

export const ReportCreatorService = {
    saveReport,
};
