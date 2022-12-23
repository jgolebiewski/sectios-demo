import { FormError } from '@reports/ui/FormError/FormError';
import { MeanOfTransportSelector } from '@reports/ui/MeansOfTransportSelector/MeansOfTransportSelector';
import { useFormContext } from 'react-hook-form';
import { DraftReport } from '../../domain/types';
import { ReportCreatorSection } from '../ReportCreator.styled';

export const ChooseMeanOfTransportation = (): JSX.Element => {
    const {
        control,
        formState: { errors },
    } = useFormContext<DraftReport>();

    return (
        <ReportCreatorSection>
            <div>
                <MeanOfTransportSelector control={control} name="meansOfTransport" label="Means of transportation" />
                <FormError>{(errors && errors.meansOfTransport?.message) || ''}</FormError>
            </div>
        </ReportCreatorSection>
    );
};
