import { getBaseUrl, HttpClient } from '../../../core/HttpClient';
import { DraftReport } from '../../report-creator/domain/types';
import { Response } from '../../../core/types';

const getReports = (): Promise<Response<DraftReport>> => {
    return HttpClient.get(getBaseUrl() + 'api/draft-reports').then((response) => {
        console.log(response);
        return { data: response.data };
    });
};

export const ReportsListService = {
    getReports,
};
