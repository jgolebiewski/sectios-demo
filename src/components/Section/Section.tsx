import React, { useEffect } from 'react';
import { SectionWrapper } from './Section.styled';
import { ActionButton, IIconProps } from '@fluentui/react';
import { SectionFieldModel } from './../../domain/SectionFieldModel';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ReportModel } from '../../domain/ReportModel';
import { CustomTextField } from '../../common/CustomTextField/CustomTextField';

const addIcon: IIconProps = { iconName: 'Add' };

export const Section: React.FunctionComponent<{ index: number }> = ({ index }) => {

    const context = useFormContext<ReportModel>();
    const control = context.control;

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
                <CustomTextField
                    key={i}
                    name={`sections.${index}.fields.${i}.value`}
                    control={control}
                    label={item.name}
                />
            )
            )
        }

        <ActionButton iconProps={addIcon} text='Add new field' onClick={() => append(new SectionFieldModel({ name: 'new', value: '' }))} />
    </SectionWrapper>
}