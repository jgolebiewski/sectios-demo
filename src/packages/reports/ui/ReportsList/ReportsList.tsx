import { useEffect, useState } from 'react';
import { ReportsListService } from '../../services/ReportsListService';
import { DraftReport } from '../../../report-creator/domain/types';
import { Link } from '@fluentui/react';
export const ReportsList = (): JSX.Element => {
    const [reports, setReports] = useState<DraftReport[]>([]);

    useEffect(() => {
        (async () => {
            const response = await ReportsListService.getReports();
            setReports(response.data);
        })();
    }, []);

    return (
        <div>
            <ul>
                {reports.map((report) => (
                    <li key={report.id}>
                        {report.id}
                        <Link>Show summary</Link>
                        <Link>Full vacation report</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
