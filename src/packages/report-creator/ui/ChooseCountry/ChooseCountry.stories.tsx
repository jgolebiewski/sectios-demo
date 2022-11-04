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
        reValidateMode: 'onChange',
        defaultValues: {
            from: new Date(),
            to: new Date(),
            countries: [],
        },
    });

    const handleClick = () => {
        methods.trigger();
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data: any) => console.log('submit', data))}>
                <ChooseCountry />
                <PrimaryButton type="button" onClick={handleClick}>
                    Submit
                </PrimaryButton>
            </form>
        </FormProvider>
    );
};
