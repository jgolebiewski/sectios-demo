import { ComponentStory } from '@storybook/react-vite';
import { useForm, FormProvider } from 'react-hook-form';
import { CustomNumberField } from './CustomNumberField';

export default {
    title: 'UI/CustomNumberField',
    component: CustomNumberField,
    args: {},
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const _CustomNumberField: ComponentStory<typeof CustomNumberField> = (args: any) => {
    const methods = useForm();
    return (
        <FormProvider {...methods}>
            <form>
                <CustomNumberField {...args} control={methods.control} name="numberOfPeople" label="Number of people" />
            </form>
        </FormProvider>
    );
};
