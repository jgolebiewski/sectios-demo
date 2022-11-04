import { ComponentStory } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { CheckboxGroup } from './CheckboxGroup';

export default {
    title: 'UI/CheckboxGroup',
    component: CheckboxGroup,
    args: {
        groups: [
            { key: 'airplane', text: 'Airplane' },
            { key: 'ferry', text: 'Ferry' },
        ],
    },
};

export const _CheckboxGroup: ComponentStory<typeof CheckboxGroup> = (args: any) => {
    const methods = useForm();
    return (
        <FormProvider {...methods}>
            <form>
                <CheckboxGroup {...args} control={methods.control} name="groups" />
            </form>
            <pre>{methods.formState.errors.groups || 'no errors'}</pre>
        </FormProvider>
    );
};
