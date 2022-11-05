import { CustomNumberField } from '@reports/ui/CustomNumberField/CustomNumberField';
import { FormError } from '@reports/ui/FormError/FormError';
import { useFormContext } from 'react-hook-form';
import { DraftReport } from '../../domain/types';
import { ReportCreatorSection } from '../ReportCreator.styled';

export const ChooseNumberOfPeople = (): JSX.Element => {
    const {
        control,
        formState: { errors },
    } = useFormContext<DraftReport>();

    return (
        <ReportCreatorSection>
            <CustomNumberField control={control} label="Number of people" name="numberOfPeople" />
            <FormError>{(errors && errors.numberOfPeople?.message) || ''}</FormError>
        </ReportCreatorSection>
    );
};
