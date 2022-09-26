/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomDatePicker } from '@reports/ui';
import { Meta, ComponentStory } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

import * as yup from 'yup';

const schema = yup
    .object({
        date: yup.date().required(),
    })
    .required();

export default {
    title: 'UI/CustomDatePicker',
    component: CustomDatePicker,
    args: {
        date: new Date(),
    },
} as Meta;

const Template: ComponentStory<typeof CustomDatePicker> = (args: any) => {
    const methods = useForm({
        resolver: yupResolver(schema),
    });
    return (
        <FormProvider {...methods}>
            <form>
                <CustomDatePicker {...args} control={methods.control} name="date" label="Date picker" />
            </form>
            <pre>{methods.formState.errors.date || 'no errors'}</pre>
        </FormProvider>
    );
};

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
};
