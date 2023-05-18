import { Meta, ComponentStory } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { Period } from '../../domain/Period';
import { PeriodComponent } from './PeriodComponent';

export default {
    title: 'UI/Period',
    component: PeriodComponent,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const _Period: ComponentStory<typeof PeriodComponent> = (args: any) => {
    const methods = useForm({
        defaultValues: {
            vacationPeriod: { from: new Date(), to: new Date() },
        },
    });
    const p = new Period();
    Period.createFromString(new Date().toDateString(), new Date().toDateString());

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(() => console.log('submit'))}>
                <PeriodComponent
                    fromField="vacationPeriod.from"
                    toField="vacationPeriod.to"
                    control={methods.control}
                    label="Period"
                    errors={methods.formState.errors}
                />
            </form>
        </FormProvider>
    );
};
