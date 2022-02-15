import React, { useEffect } from 'react';
import { SectionModel } from '../../domain/SectionModel';
import { SectionField } from '../SectionField/SectionField';
import { SectionWrapper } from './Section.styled';
import { useState } from 'react';
import { ActionButton, IIconProps, TextField } from '@fluentui/react';
import { SectionFieldModel } from './../../domain/SectionFieldModel';
import { Control, Controller, FieldValues, useFieldArray, useFormContext } from 'react-hook-form';
import { ReportModel } from '../../domain/ReportModel';



type FormValues = {
    fields: SectionFieldModel[];
};


export const Section: React.FunctionComponent<{ control: Control<ReportModel>, register: any, index: number }> = ({ control, register, index }) => {


    // const context = useFormContext();


    const addIcon: IIconProps = { iconName: 'Add' };
    // context.setValue(`sections.${index}.fields`, section.fields);
    // const [sectionModel, setSectionModel] = useState(section);


    const { fields, append } = useFieldArray({
        name: `sections.${index}.fields`,
        control
    });
    console.log({ fields });

    useEffect(() => {
        // sectionModel.validate();
        console.log('Rendering section ', fields);
    }, [fields]);

    return <SectionWrapper>
        {/* <h5>{sectionModel.name}</h5> */}
        {
            fields.map((item, i) =>
            (
                <Controller
                    key={item.id}
                    name={`sections.${index}.fields.${i}.value`}
                    control={control}
                    defaultValue={item.value}
                    render={({ field }) => <TextField {...field} label={item.name} />}
                />
            )
            )
        }

        <ActionButton iconProps={addIcon} text='Add new field' onClick={() => append(new SectionFieldModel({ name: 'new', value: '' }))} />
    </SectionWrapper>
}