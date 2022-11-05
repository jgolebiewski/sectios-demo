import { CustomNumberField } from '@reports/ui/CustomNumberField/CustomNumberField';
import { FormError } from '@reports/ui/FormError/FormError';
import { useFormContext } from 'react-hook-form';
import { DraftReport } from '../../machines/reportCreator.machine';

export const ChooseNumberOfPeople = (): JSX.Element => {
    const {
        control,
        formState: { errors },
    } = useFormContext<DraftReport>();

    return (
        <div className="mb-10">
            <CustomNumberField control={control} label="Number of people" name="numberOfPeople" />
            <FormError>{(errors && errors.numberOfPeople?.message) || ''}</FormError>
        </div>
    );
};
