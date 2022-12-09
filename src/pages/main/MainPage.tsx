import { Link } from '@fluentui/react';
import { MainPageWrapper } from './MainPage.styled';
import { ReportsList } from '@reports/reports';

export const MainPage = (): JSX.Element => {
    return (
        <MainPageWrapper>
            <Link href="/report-creator" className="mb-10 d-block">
                Report Creator
            </Link>
            <ReportsList />
        </MainPageWrapper>
    );
};
