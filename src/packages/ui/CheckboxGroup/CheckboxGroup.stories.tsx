import { ComponentStory } from '@storybook/react-vite';
import { useForm, FormProvider } from 'react-hook-form';
import { CheckboxGroup } from './CheckboxGroup';

const meta = {
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
        </FormProvider>
    );
};
