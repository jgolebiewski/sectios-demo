import { IDropdownOption } from '@fluentui/react';
import { ErrorMessage } from '@hookform/error-message';
import { useState, useEffect } from 'react';
import { FieldErrors } from 'react-hook-form';
import { DataService } from '../../../core/services/DataService';
import { Report } from '../../../domain/Report';
import { CheckboxGroup } from '../CheckboxGroup/CheckboxGroup';
import { CustomFieldProps } from '../CustomFieldProps';
import { FormError } from '../FormError/FormError';

type Err = FieldErrors<Report> | undefined;

type MeanOfTransportSelectorProps = CustomFieldProps;

export const MeanOfTransportSelector = (props: MeanOfTransportSelectorProps): JSX.Element => {
    const [means, setMeans] = useState<IDropdownOption[]>([]);

    useEffect(() => {
        (async () => {
            const response = await DataService.getMeansOfTransport();
            setMeans(response.data.map((mt) => ({ key: mt.id, id: mt.id, text: mt.name })));
        })();
    }, []);

    return (
        <div>
            <CheckboxGroup groups={means} {...props} />
            <ErrorMessage {...props} render={({ message }) => <FormError>{message}</FormError>} />
        </div>
    );
};
