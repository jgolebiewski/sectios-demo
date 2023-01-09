import { initializeIcons, setIconOptions } from '@fluentui/react';
import { ReportPage } from './pages/report/ReportPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/main/MainPage';
import { ReportCreatorPage } from './pages/report-creator/ReportCreatorPage';
import { DefaultLayout } from './layouts/DefaultLayout';
import { ErrorHandler } from './packages/error-ui';
import { ConsoleLogger } from './core/ConsoleLogger';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function App() {
    initializeIcons();
    setIconOptions({
        disableWarnings: true,
    });

    return (
        <DefaultLayout>
            <QueryClientProvider client={queryClient}>
                <ErrorHandler logger={new ConsoleLogger()}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/report-creator" element={<ReportCreatorPage />} />
                            <Route path="/report/:id" element={<ReportPage />} />
                        </Routes>
                    </BrowserRouter>
                </ErrorHandler>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </DefaultLayout>
    );
}

export default App;
