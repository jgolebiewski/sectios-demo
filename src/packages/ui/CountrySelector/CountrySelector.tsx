import { IDropdownOption } from '@fluentui/react';
import { CustomFieldProps } from '../CustomFieldProps';
import { CustomMultiselect } from '../CustomMultiselect/CustomMultiselect';

export const CountrySelector = (props: CustomFieldProps): JSX.Element => {
    const options: IDropdownOption[] = [
        { key: 'PL', text: 'Poland' },
        { key: 'DE', text: 'Germany' },
    ];

    return <CustomMultiselect {...props} options={options} placeholder="Choose country" />;
};
