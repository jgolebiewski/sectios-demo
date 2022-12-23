import { useFormContext, useFieldArray } from 'react-hook-form';
import { CountryComponent } from '../CountryComponent/CountryComponent';
import { ReportForm } from '../../data/ReportForm';

export const Countries = (): JSX.Element => {
    const {
        control,
        formState: { errors },
    } = useFormContext<ReportForm>();

    const { fields } = useFieldArray({ name: 'countrySectionForm', control: control });

    return (
        <div>
            Country section
            {fields.map((c, i) => (
                <CountryComponent key={c.id} index={i} country={c.country} />
            ))}
        </div>
    );
};
