import { Checkbox, IDropdownOption } from '@fluentui/react';
import { FormEvent } from 'react';
import { Controller } from 'react-hook-form';
import { CustomFieldProps } from '../CustomFieldProps';

interface CheckboxGroupProps {
    groups: IDropdownOption[];
}

export const CheckboxGroup = (props: CheckboxGroupProps & CustomFieldProps): JSX.Element => {
    const { control, name, groups, disabled, label } = props;

    return (
        <Controller
            name={name || '_name_'}
            control={control}
            render={({ field }) => {
                let value = field.value as string[];

                return (
                    <>
                        {label && <h5>{label}</h5>}
                        {groups.map((item, _index) => (
                            <Checkbox
                                className="mb-10"
                                disabled={disabled}
                                key={item.key}
                                name={`${item.text}`}
                                label={item.text}
                                checked={value && value.some((ex: string) => ex === item.key)}
                                onChange={(
                                    event: FormEvent<HTMLElement | HTMLInputElement> | undefined,
                                    checked: boolean | undefined
                                ) => {
                                    if (!event) {
                                        return;
                                    }
                                    const ht = event.target as HTMLInputElement;
                                    const inputName = ht.name;
                                    const key = groups.find((group: IDropdownOption) => group.text === inputName)?.key;

                                    if (!value) {
                                        value = [] as string[];
                                    }
                                    if (checked) {
                                        field.onChange([...value, key]);
                                    } else {
                                        field.onChange(value.filter((v: string) => v !== key));
                                    }
                                }}
                            />
                        ))}
                    </>
                );
            }}
        />
    );
};
