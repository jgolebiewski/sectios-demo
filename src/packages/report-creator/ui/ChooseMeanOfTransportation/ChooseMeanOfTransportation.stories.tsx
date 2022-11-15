import { PrimaryButton } from '@fluentui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { ComponentStory } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { reportCreatorSchema } from '../../schemas/validation-schema';
import { ChooseMeanOfTransportation } from './ChooseMeanOfTransportation';

export default {
    title: 'Report Creator/Choose Mean Of Transportation',
    component: ChooseMeanOfTransportation,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const _ChooseMeanOfTransportation: ComponentStory<typeof ChooseMeanOfTransportation> = (args: any) => {
    const methods = useForm({
        resolver: yupResolver(reportCreatorSchema),
        defaultValues: {
            countries: ['PL'],
            from: new Date(),
            to: new Date(),
            meansOfTransport: [{ key: '1', text: 'Car' }],
        },
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => console.log('submit', data))}>
                <ChooseMeanOfTransportation />
                <PrimaryButton type="button" onClick={() => console.log(methods.getValues())}>
                    Submit
                </PrimaryButton>
            </form>
        </FormProvider>
    );
};
