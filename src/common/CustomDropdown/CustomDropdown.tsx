import { Dropdown, IDropdownOption } from '@fluentui/react';
import { FC, FormEvent } from 'react';
import { Controller } from 'react-hook-form';
import { CustomFieldProps } from '../../domain/CustomFieldProps';

export const CustomDropdown: FC<CustomFieldProps & { options: IDropdownOption[] }> = ({
    name,
    label,
    control,
    disabled,
    options,
}) => {
    return (
        <div className="ms-TextField">
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Dropdown
                        {...field}
                        placeholder="Select an option"
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
