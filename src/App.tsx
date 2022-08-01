import { AppWrapper } from './App.styled';
import { ThemeProvider, initializeIcons, setIconOptions } from '@fluentui/react';
import { ReportPage } from './pages/report/ReportPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/main/MainPage';
import { ReportCreatorPage } from './pages/report-creator/ReportCreatorPage';

function App() {
    initializeIcons();
    setIconOptions({
        disableWarnings: true,
    });

    return (
        <ThemeProvider>
            <AppWrapper>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/report-creator" element={<ReportCreatorPage />} />
                        <Route path="/report" element={<ReportPage />} />
                    </Routes>
                </BrowserRouter>
            </AppWrapper>
        </ThemeProvider>
    );
}

export default App;
