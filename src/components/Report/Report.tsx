
import React, { useEffect } from 'react';
import { ReportModel } from '../../domain/ReportModel';
import { DefaultButton, PrimaryButton, Stack } from '@fluentui/react';
import { ReportWrapper, TittleWrapper } from './Report.styled';
import { FormProvider, useForm } from 'react-hook-form';
import { OverView } from '../Overview/Overview';
import { RoutesComponent } from '../Routes/RoutesComponent';
import { Sections } from '../Sections/Sections';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../schema/validation-schema';



export const Report: React.FunctionComponent<{ report: ReportModel }> = ({ report }) => {



    const methods = useForm<ReportModel>({
        defaultValues: {
            sections: report.sections,
            overview: report.overview,
            routes: report.routes,
        },
        resolver: yupResolver(schema),
        reValidateMode: 'onBlur',
        criteriaMode: 'all',
        delayError: 300
    });


    useEffect(() => {
        console.log('Rendering report');
    })

    const handleValidator = () => {
        console.log(methods.formState.isValid)
    }

    const onSubmit = (data: any) => {
        console.log('submit', data);
    }


    return <ReportWrapper>
        <TittleWrapper>
            <h1> {report.name} </h1>
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