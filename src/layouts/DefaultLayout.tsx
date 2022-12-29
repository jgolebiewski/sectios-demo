import { Layout } from './DefaultLayout.styled';
import { TopBar } from './TopBar/TopBar';

export const DefaultLayout = (props: { children: JSX.Element }): JSX.Element => {
    return (
        <Layout>
            <TopBar />
            <div className="content">{props.children}</div>
        </Layout>
    );
};
