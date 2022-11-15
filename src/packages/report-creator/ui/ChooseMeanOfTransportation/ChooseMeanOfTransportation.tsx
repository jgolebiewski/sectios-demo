import { IDropdownOption } from '@fluentui/react';
import { CheckboxGroup } from '@reports/ui/CheckboxGroup/CheckboxGroup';
import { FormError } from '@reports/ui/FormError/FormError';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { DataService } from '../../../../core/services/DataService';
import { DraftReport } from '../../domain/types';
import { ReportCreatorSection } from '../ReportCreator.styled';

export const ChooseMeanOfTransportation = (): JSX.Element => {
    const {
        control,
        formState: { errors },
    } = useFormContext<DraftReport>();

    const [means, setMeans] = useState<IDropdownOption[]>([]);

    useEffect(() => {
        (async () => {
            const response = await DataService.getMeansOfTransport();
            setMeans(response.data.map((mt) => ({ key: mt.id, text: mt.name })));
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
