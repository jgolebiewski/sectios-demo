/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentStory, Meta } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { ChoosePeriod } from './ChoosePeriod';
import { reportCreatorSchema } from '../../schemas/validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { PrimaryButton } from '@fluentui/react';

export default {
    title: 'Report Creator/Choose Period',
    component: ChoosePeriod,
} as Meta;

export const _ChoosePeriod: ComponentStory<typeof ChoosePeriod> = (args: any) => {
    const methods = useForm({
        resolver: yupResolver(reportCreatorSchema),
        defaultValues: {
            from: '',
            to: '',
        },
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(() => console.log('submit'))}>
                <ChoosePeriod />
                <PrimaryButton type="submit">Submit</PrimaryButton>
            </form>
        </FormProvider>
    );
};
