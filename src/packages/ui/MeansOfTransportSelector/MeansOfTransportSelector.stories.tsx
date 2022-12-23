import { Meta, ComponentStory } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { Period } from '../../../domain/Period';
import { MeanOfTransportSelector } from './MeansOfTransportSelector';

export default {
    title: 'UI/MeanOfTransportSelector',
    component: MeanOfTransportSelector,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const _MeanOfTransportSelector: ComponentStory<typeof MeanOfTransportSelector> = (args: any) => {
    const methods = useForm({
        defaultValues: {
            meansOfTransportOption: [1],
        },
    });
    const p = new Period();
    Period.createFromString(new Date().toDateString(), new Date().toDateString());

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(() => console.log('submit'))}>
                <MeanOfTransportSelector
                    name="meansOfTransportOption"
                    control={methods.control}
                    label="meansOfTransportOption"
                />
            </form>
        </FormProvider>
    );
};
