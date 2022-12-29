import { useFormContext, useFieldArray } from 'react-hook-form';
import { CountryComponent } from '../CountryComponent/CountryComponent';
import { ReportForm } from '../../domain/ReportForm';

export const Countries = (): JSX.Element => {
    const {
        control,
        formState: { errors },
    } = useFormContext<ReportForm>();

    const { fields } = useFieldArray({ name: 'countrySectionForm', control: control });

    return (
        <div>
            <h3>Visited Countries</h3>
            {fields.map((c, i) => (
                <div id={c.htmlId} key={c.id}>
                    <CountryComponent index={i} country={c.country} />
                </div>
            ))}
        </div>
    );
};
