import { Report, ReportModel } from '@reports/report';
import { useState } from 'react';

export const ReportPage = (): JSX.Element => {
    const reportModel = new ReportModel();
    reportModel.name = 'Some awesome Report';

    const [report] = useState(reportModel);

    return <Report report={report} />;
};
