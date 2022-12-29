import { initializeIcons, setIconOptions } from '@fluentui/react';
import { ReportPage } from './pages/report/ReportPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/main/MainPage';
import { ReportCreatorPage } from './pages/report-creator/ReportCreatorPage';
import { DefaultLayout } from './layouts/DefaultLayout';

function App() {
    initializeIcons();
    setIconOptions({
        disableWarnings: true,
    });

    return (
        <DefaultLayout>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/report-creator" element={<ReportCreatorPage />} />
                    <Route path="/report/:id" element={<ReportPage />} />
                </Routes>
            </BrowserRouter>
        </DefaultLayout>
    );
}

export default App;
