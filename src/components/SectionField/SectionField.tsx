import { TextField } from '@fluentui/react';
import * as React from 'react';
import { useState } from 'react';
import { SectionFieldModel } from '../../domain/SectionFieldModel';
import { FieldWrapper } from './SectionField.styled';


export const SectionField: React.FunctionComponent<{
    sectionField: SectionFieldModel,
    onChange: (args: string) => void
}> = ({ sectionField, onChange }) => {


    const [field, setField] = useState<SectionFieldModel>(sectionField);

    const handleOnChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        const copy = {...field};
        copy.value = newValue ? newValue : '';
        setField(copy);
        onChange(copy.value)
    }

    return <FieldWrapper>

        <TextField label={sectionField.name} value={field.value} onChange={handleOnChange} />

    </FieldWrapper>
}