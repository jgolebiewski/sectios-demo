import { useQuery } from 'react-query';
import { Report } from '@reports/domain';
import { ReportsListService } from '../services/ReportsListService';

interface UseReportList {
    isLoading: boolean;
    isSuccess: boolean;
    reports: Report[];
}

export const useReportList = (): UseReportList => {
    const {
        data: reports,
        isLoading,
        isSuccess,
    } = useQuery<Report[]>('getReports', ReportsListService.getReports, {
        initialData: [],
        useErrorBoundary: true,
    });

    return {
        isLoading,
        isSuccess,
        reports: reports || [],
    };
};
