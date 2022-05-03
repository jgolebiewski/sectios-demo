import React, { useState } from 'react';
import { Report } from './components/Report/Report';
import { ReportModel } from './domain/ReportModel';
import { AppWrapper } from './App.styled';
import { ThemeProvider, initializeIcons, setIconOptions } from '@fluentui/react';

const reportModel = new ReportModel();
reportModel.name = 'Some Report';

function App() {
    initializeIcons();
    setIconOptions({
        disableWarnings: true,
    });
    const [report] = useState(reportModel);

    return (
        <ThemeProvider>
            <AppWrapper>
                <Report report={report} />
            </AppWrapper>
        </ThemeProvider>
    );
}

export default App;
