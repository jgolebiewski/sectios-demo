import { PrimaryButton } from '@fluentui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { ComponentStory, Meta } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { reportCreatorSchema } from '../../schemas/validation-schema';
import { ChooseMeanOfTransportation } from './ChooseMeanOfTransportation';

export default {
    title: 'Report Creator/Choose Mean Of Transportation',
    component: ChooseMeanOfTransportation,
};

export const _ChooseMeanOfTransportation: ComponentStory<typeof ChooseMeanOfTransportation> = (args: any) => {
    const methods = useForm({
        resolver: yupResolver(reportCreatorSchema),
        defaultValues: {
            countries: ['PL'],
            from: new Date(),
            to: new Date(),
            meansOfTransport: ['1'],
        },
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => console.log('submit', data))}>
                <ChooseMeanOfTransportation />
                <PrimaryButton type="submit">Submit</PrimaryButton>
            </form>
        </FormProvider>
    );
};
