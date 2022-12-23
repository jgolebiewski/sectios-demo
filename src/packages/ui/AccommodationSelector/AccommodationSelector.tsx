import { IDropdownOption } from '@fluentui/react';
import { useEffect, useState } from 'react';
import { FieldErrors } from 'react-hook-form';
import { DataService } from '../../../core/services/DataService';
import { Report } from '../../../domain/Report';
import { CustomFieldProps } from '../CustomFieldProps';
import { CustomMultiselect } from '../CustomMultiselect/CustomMultiselect';

type Err = FieldErrors<Report> | undefined;

type AccommodationSelectorProps = CustomFieldProps & { errors: Err };

export const AccommodationSelector = (props: AccommodationSelectorProps): JSX.Element => {
    const [options, setOptions] = useState<IDropdownOption[]>([]);

    const { name: field, errors } = props;

    useEffect(() => {
        (async () => {
            const response = await DataService.getAccommodations();
            setOptions(response.data.map((acc) => ({ key: acc.id, text: acc.name })));
        })();
    }, []);

    return (
        <div>
            <CustomMultiselect {...props} options={options} placeholder="Choose accommodations" />
        </div>
    );
};
