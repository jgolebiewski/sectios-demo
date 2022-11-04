import { useMachine } from '@xstate/react';
import { todoMachine } from '../machines/todoAppMachine';
import { Greetings } from './Greetings/Greetings';
import { Report, ReportContext, reportCreateMachine } from '../machines/reportCreator.machine';
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
                console.log('save report', context, _event);
                return ReportCreatorService.saveReport(context.data);
            },
            loadCountries: async () => {
                console.log('loadCountries');
            },
        },
    });

    const methods = useForm<Report>({
        resolver: yupResolver(reportCreatorSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: state.context.data,
    });

    const handlePreviousState = () => {
        send('Prev');
    };

    const handleNextState = () => {
        console.log(state.event);
        const data: Report = methods.getValues();
        const ctx: ReportContext = {
            data,
            formErrors: methods.formState.errors,
        };
        send({ type: 'FormChange', value: ctx });
        send('Next');
    };

    const showPrevNext = () => {
        return (
            !state.matches('Welcome') &&
            !state.matches('Finish') &&
            !state.matches('End Report') &&
            !state.matches('Summary')
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
                    {state.matches('Welcome') && <Greetings handleStart={() => send('Start')} />}
                    {state.matches('Choose Period') && <ChoosePeriod />}
                    {state.matches('Choose number of people') && <ChooseNumberOfPeople />}
                    {state.matches('Choose Country') && <ChooseCountry />}
                    {state.matches('Choose Means of transports') && <ChooseMeanOfTransportation />}
                    {state.matches('Finish') && <Ending />}
                    {state.matches('End Report') && <Ending />}

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
                                <PrimaryButton onClick={() => send('Finish')}>Finish</PrimaryButton>
                            </ButtonsWrapper>
                        </>
                    )}
                </form>
            </FormProvider>
        </CreatorWrapper>
    );
};
