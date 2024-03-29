import { Dropdown, IDropdownOption } from '@fluentui/react';
import { FC, FormEvent } from 'react';
import { Controller } from 'react-hook-form';
import { CustomFieldProps } from '../CustomFieldProps';

interface CustomDropdownProps {
    placeholder?: string;
    options: IDropdownOption[];
}

export const CustomDropdown: FC<CustomFieldProps & CustomDropdownProps> = ({
    name,
    label,
    control,
    disabled,
    options,
    placeholder,
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
                        selectedKey={field.value}
                        options={options}
                        onChange={(event: FormEvent<HTMLDivElement>, item: IDropdownOption | undefined) => {
                            field.onChange(item?.key);
                        }}
                    />
                )}
            />
        </div>
    );
};
