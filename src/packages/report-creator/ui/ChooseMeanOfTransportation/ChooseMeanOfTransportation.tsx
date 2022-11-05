import { CheckboxGroup } from '@reports/ui/CheckboxGroup/CheckboxGroup';
import { FormError } from '@reports/ui/FormError/FormError';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { DataService } from '../../../../core/services/DataService';
import { MeanOfTransport } from '../../../../core/types';
import { DraftReport } from '../../domain/types';
import { ReportCreatorSection } from '../ReportCreator.styled';

export const ChooseMeanOfTransportation = (): JSX.Element => {
    const {
        control,
        formState: { errors },
    } = useFormContext<DraftReport>();

    const [means, setMeans] = useState<MeanOfTransport[]>([]);

    useEffect(() => {
        (async () => {
            const response = await DataService.getMeansOfTransport();
            setMeans(response.data);
        })();
    }, []);

    return (
        <ReportCreatorSection>
            <div>
                <CheckboxGroup
                    groups={means}
                    control={control}
                    label="Means of transportation"
                    name="meansOfTransport"
                />

                <FormError>{(errors && errors.meansOfTransport?.message) || ''}</FormError>
            </div>
        </ReportCreatorSection>
    );
};
