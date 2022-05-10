import React, { useEffect } from 'react';
import { ReportModel } from '../../domain/ReportModel';
import { DefaultButton, PrimaryButton, Stack } from '@fluentui/react';
import { ReportContent, ReportWrapper, TittleWrapper } from './Report.styled';
import { FormProvider, useForm } from 'react-hook-form';
import { OverView } from '../Overview/Overview';
import { RoutesComponent } from '../Routes/RoutesComponent';
import { Sections } from '../Sections/Sections';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../schema/validation-schema';
import { ReportNavigation } from '../ReportNavigation/ReportNavigation';

let renderCount = 0;
export const Report: React.FunctionComponent<{ report: ReportModel }> = ({ report }) => {
    renderCount++;

    const methods = useForm<ReportModel>({
        defaultValues: {
            sections: report.sections,
            overview: report.overview,
            routes: report.routes,
        },
        resolver: yupResolver(schema),
        reValidateMode: 'onBlur',
        criteriaMode: 'all',
        delayError: 100,
    });

    useEffect(() => {
        console.log('Rendering report');
    }, []);

    const handleValidator = () => {
        methods.trigger();
        console.log(methods.formState.isValid);
    };

    const onSubmit = (data: unknown) => {
        console.log('submit', data);
    };

    return (
        <ReportWrapper>
            <FormProvider {...methods}>
                <ReportNavigation report={report} />
                <ReportContent>
                    <TittleWrapper>
                        <h1>
                            {' '}
                            {report.name} = {renderCount}
                        </h1>
                    </TittleWrapper>

                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <OverView />
                        <Sections />
                        <RoutesComponent />
                        <Stack horizontal>
                            <PrimaryButton text="Save" type="submit" />
                            <DefaultButton text="Validate" onClick={handleValidator} />
                        </Stack>
                    </form>
                </ReportContent>
            </FormProvider>
        </ReportWrapper>
    );
};
