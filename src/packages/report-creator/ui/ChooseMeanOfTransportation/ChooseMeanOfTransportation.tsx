import { IDropdownOption } from '@fluentui/react';
import { CheckboxGroup } from '@reports/ui/CheckboxGroup/CheckboxGroup';
import { FormError } from '@reports/ui/FormError/FormError';
import { useFormContext } from 'react-hook-form';
import { MeansOfTransports } from '../../types';
import { ChooseMeanOfTransportationWrapper } from './ChooseMeanOfTransportation.styled';

export const ChooseMeanOfTransportation = (): JSX.Element => {
    const {
        control,
        setValue,
        watch,
        formState: { errors },
    } = useFormContext<{ meansOfTransport: any[] }>();

    const means: IDropdownOption[] = [
        { key: MeansOfTransports.Airplane.toString(), text: 'Airplane' },
        { key: MeansOfTransports.Car.toString(), text: 'Car' },
        { key: MeansOfTransports.Ferry.toString(), text: 'Ferry' },
        { key: MeansOfTransports.Train.toString(), text: 'Train' },
    ];

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
