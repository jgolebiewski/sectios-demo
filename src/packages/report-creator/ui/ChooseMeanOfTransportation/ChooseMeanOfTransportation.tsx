import { IDropdownOption } from '@fluentui/react';
import { CheckboxGroup } from '@reports/ui/CheckboxGroup/CheckboxGroup';
import { FormError } from '@reports/ui/FormError/FormError';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { DataService } from '../../../../core/services/DataService';
import { MeanOfTransport } from '../../../../core/types';
import { ChooseMeanOfTransportationWrapper } from './ChooseMeanOfTransportation.styled';

export const ChooseMeanOfTransportation = (): JSX.Element => {
    const {
        control,
        setValue,
        watch,
        formState: { errors },
    } = useFormContext<{ meansOfTransport: any[] }>();

    const [means, setMeans] = useState<MeanOfTransport[]>([]);

    useEffect(() => {
        (async () => {
            const response = await DataService.getMeansOfTransport();
            setMeans(response.data);
        })();
    }, []);

    return (
        <ChooseMeanOfTransportationWrapper>
            <div>
                <CheckboxGroup
                    groups={means}
                    control={control}
                    label="Means of transportation"
                    name="meansOfTransport"
                />

                <FormError>{(errors && errors.meansOfTransport?.message) || ''}</FormError>
            </div>
        </ChooseMeanOfTransportationWrapper>
    );
};
