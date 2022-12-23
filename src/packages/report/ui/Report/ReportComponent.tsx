import { ReportWrapper } from './Report.styled';

import { ReportNavigation } from '../ReportNavigation/ReportNavigation';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { reportValidationSchema } from '../../schema/validation-schema';
import { DefaultButton, PrimaryButton, Stack } from '@fluentui/react';
import { Overview } from '../Overview/Overview';
import { Countries } from '../Countries/Countries';
import { ReportForm } from '../../data/ReportForm';

export const ReportComponent = ({ report }: { report: ReportForm }): JSX.Element => {
    const methods = useForm<ReportForm>({
        defaultValues: report,
        resolver: yupResolver(reportValidationSchema),
        reValidateMode: 'onBlur',
        criteriaMode: 'all',
        delayError: 100,
    });

    const handleValidator = () => {
        methods.trigger();
        console.log(methods.formState);
    };

    const onSubmit = (data: unknown) => {
        console.log('submit', data);
    };

    return (
        <FormProvider {...methods}>
            <ReportWrapper>
                <ReportNavigation report={report} />
                <div>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Overview />
                        <Countries />
                        <Stack horizontal>
                            <PrimaryButton text="Save" type="submit" />
                            <DefaultButton text="Validate" onClick={handleValidator} />
                        </Stack>
                    </form>
                </div>
            </ReportWrapper>
        </FormProvider>
    );
};
