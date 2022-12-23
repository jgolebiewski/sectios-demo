import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ReportService } from '../services/ReportService';
import { ReportForm } from '../data/ReportForm';
interface UseReport {
    loading: boolean;
    report: ReportForm | null;
}

export const useReport = (): UseReport => {
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState<ReportForm | null>(null);
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            if (id) {
                const rep = await ReportService.getReport(id);

                setReport(new ReportForm(rep.data));
                setLoading(false);
            }
        })();
    }, []);

    return {
        loading,
        report,
    };
};
