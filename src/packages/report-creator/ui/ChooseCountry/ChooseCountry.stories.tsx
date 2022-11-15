import { PrimaryButton } from '@fluentui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { ComponentStory } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { reportCreatorSchema } from '../../schemas/validation-schema';
import { ChooseCountry } from './ChooseCountry';

export default {
    title: 'Report Creator/Choose Country',
    template: ChooseCountry,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        console.log(methods.getValues());
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => console.log('submit', data))}>
                <ChooseCountry />
                <PrimaryButton type="button" onClick={handleClick}>
                    Submit
                </PrimaryButton>
            </form>
        </FormProvider>
    );
};
