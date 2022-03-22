import React, { useState } from 'react';
import { Report } from './components/Report/Report';
import { ReportModel } from './domain/ReportModel';
import { SectionModel } from './domain/SectionModel';
import { AppWrapper } from './App.styled';
import { SectionFieldModel } from './domain/SectionFieldModel';
import { ThemeProvider, initializeIcons, setIconOptions } from '@fluentui/react';

const reportModel = new ReportModel();
reportModel.name = "Some Report";
reportModel.sections = [
  new SectionModel({
    name: 'Section 1', fields: [
      new SectionFieldModel({ name: 'Field 1', value: 'some value' }),
      new SectionFieldModel({ name: 'Field 2', value: '' }),
    ]
  }),
  new SectionModel({
    name: 'Section 2', fields: [
      new SectionFieldModel({ name: 'Field 3', value: '' }),
      new SectionFieldModel({ name: 'Field 4', value: '' }),
    ]
  }),
  new SectionModel({
    name: 'Section 3', fields: [
      new SectionFieldModel({ name: 'Field 5', value: '' }),
      new SectionFieldModel({ name: 'Field 6', value: '' })
    ]
  }),
];


function App() {
  initializeIcons();
  setIconOptions({
    disableWarnings: true,

  })
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
