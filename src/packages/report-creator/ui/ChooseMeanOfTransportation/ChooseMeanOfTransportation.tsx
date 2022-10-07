import { Checkbox } from '@fluentui/react';
import { CustomCheckbox } from '@reports/ui/CustomCheckbox/CustomCheckbox';
import { FormError } from '@reports/ui/FormError/FormError';
import { FormEvent } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { MeansOfTransports } from '../../types';
import { ChooseMeanOfTransportationWrapper } from './ChooseMeanOfTransportation.styled';

export const ChooseMeanOfTransportation = (): JSX.Element => {
    const {
        control,
        setValue,
        watch,
        formState: { errors },
    } = useFormContext<{ meansOfTransport: any[] }>();

    const means = [
        { value: MeansOfTransports.Airplane, text: 'Airplane' },
        { value: MeansOfTransports.Car, text: 'Car' },
        { value: MeansOfTransports.Ferry, text: 'Ferry' },
        { value: MeansOfTransports.Train, text: 'Train' },
    ];

    return (
        <ChooseMeanOfTransportationWrapper>
            <div>
                <Controller
                    name="meansOfTransport"
                    control={control}
                    render={({ field }) => (
                        <>
                            {means.map((item, index) => (
                                <Checkbox
                                    className="mb-10"
                                    key={index}
                                    name={`${item.text}`}
                                    label={item.text}
                                    checked={field.value && field.value.some((ex) => ex === item.text)}
                                    onChange={(
                                        event: FormEvent<HTMLElement | HTMLInputElement> | undefined,
                                        checked: boolean | undefined
                                    ) => {
                                        if (!event) {
                                            return;
                                        }
                                        const ht = event.target as HTMLInputElement;
                                        const name = ht.name;
                                        console.log(name, field.value);
                                        if (!field.value) {
                                            field.value = [];
                                        }
                                        if (checked) {
                                            // field.value.push(name);
                                            field.onChange([...field.value, name]);
                                        } else {
                                            field.onChange(field.value.filter((v) => v !== name));
                                        }
                                    }}
                                />
                            ))}
                        </>
                    )}
                />

                <FormError>{(errors && errors.meansOfTransport?.message) || ''}</FormError>
            </div>
        </ChooseMeanOfTransportationWrapper>
    );
};
