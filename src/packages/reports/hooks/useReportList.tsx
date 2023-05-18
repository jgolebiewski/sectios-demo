import { useQuery } from 'react-query';
import { Report } from '../../../domain/Report';
import { ReportsListService } from '../services/ReportsListService';

import { Response } from '../../../core/types';

interface UseReportList {
    isLoading: boolean;
    isSuccess: boolean;
    reports: Report[];
}

export const useReportList = (): UseReportList => {
    const { data, isLoading, isSuccess } = useQuery({
        queryKey: 'getReports',
        queryFn: async () => {
            return await ReportsListService.getReports();
        },
        select: (resp: Response<Report>) => {
            return resp.data;
        },
        useErrorBoundary: true,
        // cacheTime: 3000,
        // staleTime: 1000,
    });

    return {
        isLoading,
        isSuccess,
        reports: data || [],
    };
};
