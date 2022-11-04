import { useEffect, useState } from 'react';
import { ReportsListService } from '../../services/ReportsListService';
export const ReportsList = (): JSX.Element => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await ReportsListService.getReports();
            setReports(response);
        })();
    }, []);

    return <pre>{JSON.stringify(reports)}</pre>;
};
