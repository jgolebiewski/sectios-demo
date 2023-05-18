import { useParams } from 'react-router-dom';
import { ReportService } from '../services/ReportService';
import { ReportForm } from '../domain/ReportForm';
import { useQuery } from 'react-query';
import { EntityResponse } from '../../../core/types';
import { Report } from '@reports/domain';
interface UseReport {
    loading: boolean;
    report: ReportForm | null;
}

export const useReport = (): UseReport => {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: 'getReport',
        queryFn: async () => {
            return id
                ? await ReportService.getReport(id)
                : await new Promise<EntityResponse<null>>((resolve) => resolve({ data: null }));
        },
        select: (resp: EntityResponse<Report> | EntityResponse<null>) => {
            return resp.data ? new ReportForm(resp.data) : null;
        },
        useErrorBoundary: true,
    });

    return {
        loading: isLoading,
        report: data || null,
    };
};
