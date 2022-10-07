import { PrimaryButton } from '@fluentui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { ComponentStory } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { reportCreatorSchema } from '../../schemas/validation-schema';
import { ChoosePeriod } from '../ChoosePeriod/ChoosePeriod';
import { ChooseCountry } from './ChooseCountry';

export default {
    title: 'Report Creator/Choose Country',
    template: ChooseCountry,
};

export const _ChooseCountry: ComponentStory<typeof ChooseCountry> = (args: any) => {
    const methods = useForm({
        resolver: yupResolver(reportCreatorSchema),
        defaultValues: {
            from: new Date(),
            to: new Date(),
            // countries: null,
        },
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data: any) => console.log('submit', data))}>
                <ChooseCountry />
                <PrimaryButton type="submit">Submit</PrimaryButton>
            </form>
        </FormProvider>
    );
};
