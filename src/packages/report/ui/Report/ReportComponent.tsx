import { ButtonsBar, ReportWrapper } from './Report.styled';
import { ReportNavigation } from '../ReportNavigation/ReportNavigation';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { reportValidationSchema } from '../../schema/validation-schema';
import { DefaultButton, PrimaryButton } from '@fluentui/react';
import { Overview } from '../Overview/Overview';
import { CountriesSectionComponent } from '../CountriesSectionComponent/CountriesSectionComponent';
import { ReportForm } from '../../domain/ReportForm';
import { Link } from 'react-router-dom';

export const ReportComponent = ({ report }: { report: ReportForm }): JSX.Element => {
    const methods = useForm<ReportForm>({
        defaultValues: report,
        resolver: yupResolver(reportValidationSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
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
                <div>
                    <ReportNavigation report={report} />
                </div>
                <div>
                    <Link to={'/'}>Back</Link>
                    <form onSubmit={methods.handleSubmit(onSubmit)} id="reportForm">
                        <Overview htmlId={report.overview.htmlId} />
                        <CountriesSectionComponent />
                    </form>
                </div>
            </ReportWrapper>
            <ButtonsBar>
                <div>
                    <PrimaryButton text="Save" type="submit" form="reportForm" />
                    &nbsp;
                    <DefaultButton text="Validate" onClick={handleValidator} />
                </div>
            </ButtonsBar>
        </FormProvider>
    );
};
