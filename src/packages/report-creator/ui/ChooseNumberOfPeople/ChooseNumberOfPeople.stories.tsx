import { PrimaryButton } from '@fluentui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { ComponentStory } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { reportCreatorSchema } from '../../schemas/validation-schema';
import { ChooseNumberOfPeople } from './ChooseNumberOfPeople';
export default {
    title: 'Report Creator/Choose Number Of People',
    template: ChooseNumberOfPeople,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const _ChooseNumberOfPeople: ComponentStory<typeof ChooseNumberOfPeople> = (args: any) => {
    const methods = useForm({
        resolver: yupResolver(reportCreatorSchema),
        defaultValues: {
            countries: ['PL'],
            from: new Date(),
            to: new Date(),
            meansOfTransport: ['1'],
            numberOfPeople: 0,
        },
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => console.log('submit', data))}>
                <ChooseNumberOfPeople />
                <PrimaryButton type="submit">Submit</PrimaryButton>
            </form>
        </FormProvider>
    );
};
