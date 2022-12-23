import { Dropdown, IDropdownOption } from '@fluentui/react';
import { FC, FormEvent } from 'react';
import { Controller } from 'react-hook-form';
import { CustomFieldProps } from '../CustomFieldProps';

interface CustomDropdownProps {
    placeholder?: string;
    options: IDropdownOption[];
}

export const CustomMultiselect: FC<CustomFieldProps & CustomDropdownProps> = ({
    name,
    label,
    control,
    disabled,
    options,
    placeholder,
    isRequired,
}) => {
    return (
        <div className="ms-TextField">
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Dropdown
                        {...field}
                        placeholder={placeholder ? placeholder : 'Select an option'}
                        label={label}
                        selectedKeys={field.value}
                        multiSelect
                        options={options}
                        disabled={disabled}
                        required={isRequired}
                        onChange={(_event: FormEvent<HTMLDivElement>, item: IDropdownOption | undefined) => {
                            let values: string[] = field.value || [];

                            if (item) {
                                if (item.selected) {
                                    values.push(item.key.toString());
                                } else {
                                    values = values.filter((v: string) => v !== item.key.toString());
                                }
                            }
                            field.onChange(values);
                        }}
                    />
                )}
            />
        </div>
    );
};
