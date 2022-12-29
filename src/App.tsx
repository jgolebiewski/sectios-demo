import { initializeIcons, setIconOptions } from '@fluentui/react';
import { ReportPage } from './pages/report/ReportPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/main/MainPage';
import { ReportCreatorPage } from './pages/report-creator/ReportCreatorPage';
import { DefaultLayout } from './layouts/DefaultLayout';
import { ErrorHandler } from './packages/error-ui';
import { ConsoleLogger } from './core/ConsoleLogger';

function App() {
    initializeIcons();
    setIconOptions({
        disableWarnings: true,
    });

    return (
        <DefaultLayout>
            <ErrorHandler logger={new ConsoleLogger()}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/report-creator" element={<ReportCreatorPage />} />
                        <Route path="/report/:id" element={<ReportPage />} />
                    </Routes>
                </BrowserRouter>
            </ErrorHandler>
        </DefaultLayout>
    );
}

export default App;
