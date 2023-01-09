import { Meta, ComponentStory } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { Period } from '../../../domain/Period';
import { CountrySelector } from './CountrySelector';

export default {
    title: 'UI/CountrySelector',
    component: CountrySelector,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const _CountrySelector: ComponentStory<typeof CountrySelector> = (args: any) => {
    const methods = useForm({
        defaultValues: {
            countries: ['PL1'],
        },
    });
    const p = new Period();
    Period.createFromString(new Date().toDateString(), new Date().toDateString());

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(() => console.log('submit'))}>
                <CountrySelector name="countries" control={methods.control} label="Select country" />
            </form>
        </FormProvider>
    );
};
