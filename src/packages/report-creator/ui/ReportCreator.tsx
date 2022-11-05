import { useMachine } from '@xstate/react';
import { Greetings } from './Greetings/Greetings';
import { DraftReport, DraftReportContext, reportCreateMachine } from '../machines/reportCreator.machine';
import { reportCreatorSchema } from '../schemas/validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { ChooseCountry } from './ChooseCountry/ChooseCountry';
import { ChooseMeanOfTransportation } from './ChooseMeanOfTransportation/ChooseMeanOfTransportation';
import { ChoosePeriod } from './ChoosePeriod/ChoosePeriod';
import { Ending } from './Ending/Ending';
import { ChooseNumberOfPeople } from './ChooseNumberOfPeople/ChooseNumberOfPeople';
import { DefaultButton, PrimaryButton } from '@fluentui/react';
import { ButtonsWrapper, CreatorWrapper } from './ReportCreator.styled';
import { useEffect } from 'react';
import { ReportSummary } from './ReportSummary/ReportSummary';
import { ReportCreatorService } from '../services/ReportCreatorService';

export const ReportCreator = (): JSX.Element => {
    const [state, send] = useMachine(reportCreateMachine, {
        services: {
            saveReport: async (context, _event) => {
                return ReportCreatorService.saveReport(context.data);
            },
        },
    });

    const methods = useForm<DraftReport>({
        resolver: yupResolver(reportCreatorSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: state.context.data,
    });

    const handlePreviousState = () => {
        send('PREV');
    };

    const handleNextState = () => {
        console.log(state.event);
        const data: DraftReport = methods.getValues();
        const ctx: DraftReportContext = {
            data,
            formErrors: methods.formState.errors,
        };
        send({ type: 'FORM_CHANGE', value: ctx });
        send('NEXT');
    };

    const showPrevNext = () => {
        return (
            !state.matches('WELCOME') &&
            !state.matches('FINISH') &&
            !state.matches('END_REPORT') &&
            !state.matches('SUMMARY')
        );
    };
    useEffect(() => {
        methods.trigger();
    }, [state]);

    return (
        <CreatorWrapper>
            <h1>Report Creator</h1>
            <FormProvider {...methods}>
                <form>
                    {state.matches('WELCOME') && <Greetings handleStart={() => send('START')} />}
                    {state.matches('CHOOSE_PERIOD') && <ChoosePeriod />}
                    {state.matches('CHOOSE_NUMBER_OF_PEOPLE') && <ChooseNumberOfPeople />}
                    {state.matches('CHOOSE_COUNTRY') && <ChooseCountry />}
                    {state.matches('CHOOSE_MEANS_OF_TRANSPORT') && <ChooseMeanOfTransportation />}
                    {state.matches('FINISH') && <Ending />}
                    {state.matches('END_REPORT') && <Ending />}

                    {showPrevNext() && (
                        <ButtonsWrapper>
                            <DefaultButton onClick={handlePreviousState}>Previous</DefaultButton>
                            <DefaultButton onClick={handleNextState}>Next</DefaultButton>
                        </ButtonsWrapper>
                    )}
                    {state.matches('Summary') && (
                        <>
                            <ReportSummary report={state.context.data} />
                            <ButtonsWrapper>
                                <DefaultButton onClick={handlePreviousState}>Previous</DefaultButton>
                                <PrimaryButton onClick={() => send('FINISH')}>Finish</PrimaryButton>
                            </ButtonsWrapper>
                        </>
                    )}
                </form>
            </FormProvider>
        </CreatorWrapper>
    );
};
