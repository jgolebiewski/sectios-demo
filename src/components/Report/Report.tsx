
import React, { useEffect } from 'react';
import { ReportModel } from '../../domain/ReportModel';
import { DefaultButton, PrimaryButton, Stack } from '@fluentui/react';
import { useState } from 'react';
import { ReportWrapper, TittleWrapper } from './Report.styled';
import { FormProvider, useForm } from 'react-hook-form';
import { OverView } from '../Overview/Overview';
import { RoutesComponent } from '../Routes/RoutesComponent';
import { Sections } from '../Sections/Sections';


export const Report: React.FunctionComponent<{ report: ReportModel }> = ({ report }) => {

    const [reportModel, setReportModel] = useState<ReportModel>(report);

    const methods = useForm<ReportModel>({
        defaultValues: {
            sections: report.sections,
            overview: report.overview,
            routes: report.routes,
        }
    });


    useEffect(() => {
        console.log('Rendering report');
    })

    const handleValidator = () => {
        const copy = reportModel.clone();
        // copy.sections.forEach(s => s.validate());
        setReportModel(copy);
    }

    const onSubmit = (data: any) => {
        console.log('submit', data);
    }


    return <ReportWrapper>
        <TittleWrapper>
            <h1> {reportModel.name} </h1>
        </TittleWrapper>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <OverView />
                <Sections />
                <RoutesComponent />
                <Stack horizontal>
                    <PrimaryButton text='Save' type="submit" />
                    <DefaultButton text='Validate' onClick={handleValidator} />
                </Stack>
            </form>
        </FormProvider>

    </ReportWrapper>

}