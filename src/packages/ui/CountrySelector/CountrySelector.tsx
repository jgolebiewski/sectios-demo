import { IDropdownOption } from '@fluentui/react';
import { useState, useEffect } from 'react';
import { DataService } from '../../../core/services/DataService';
import { CustomFieldProps } from '../CustomFieldProps';
import { CustomMultiselect } from '../CustomMultiselect/CustomMultiselect';

export const CountrySelector = (props: CustomFieldProps): JSX.Element => {
    const [options, setOptions] = useState<IDropdownOption[]>([]);

    useEffect(() => {
        (async () => {
            const response = await DataService.getCountries();
            setOptions(response.data.map((country) => ({ key: country.id, text: country.name })));
        })();
    }, []);

    return <CustomMultiselect {...props} options={options} placeholder="Choose country" />;
};
