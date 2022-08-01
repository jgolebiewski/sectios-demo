import { Link } from '@fluentui/react';
import { MainPageWrapper } from './MainPage.styled';

export const MainPage = (): JSX.Element => {
    return (
        <MainPageWrapper>
            <Link href="/report-creator">Report Creator</Link>
            &nbsp;
            <Link href="/report">Report</Link>
        </MainPageWrapper>
    );
};
