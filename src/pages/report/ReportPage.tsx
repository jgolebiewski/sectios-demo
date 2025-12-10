import { ReportComponent } from '@reports/report';
import { useReport } from '@reports/report/hooks/useReport';
import { JSX } from 'react';

export const ReportPage = (): JSX.Element => {
    const { loading, report } = useReport();

    return (
        <>
            {loading && <h1>Loading...</h1>}
            {report && <ReportComponent report={report} />}
        </>
    );
};
