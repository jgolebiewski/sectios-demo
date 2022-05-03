import React, { useEffect } from 'react';
import { SectionWrapper } from './Section.styled';
import { ActionButton, IIconProps } from '@fluentui/react';
import { SectionFieldModel } from './../../domain/SectionFieldModel';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ReportModel } from '../../domain/ReportModel';
import { CustomTextField } from '../../common/CustomTextField/CustomTextField';

const addIcon: IIconProps = { iconName: 'Add' };

export const Section: React.FunctionComponent<{ index: number }> = ({ index }) => {
    const {
        control,
        formState: { errors },
    } = useFormContext<ReportModel>();

    const { fields: sectionFields, append } = useFieldArray({
        name: `sections.${index}.fields`,
        control,
    });

    useEffect(() => {
        console.log('Rendering section ');
    });

    const getErrorMessage = (fieldIndex: number): string => {
        let msg = '';
        if (errors && errors.sections) {
            const section = errors.sections[index];
            if (section && section.fields && Array.isArray(section.fields)) {
                const field = section.fields[fieldIndex];
                const value = field && field.value ? field.value : null;
                msg = value && value.message ? value.message : '';
            }
        }

        return msg;
    };

    return (
        <SectionWrapper>
            {sectionFields.map((item, i) => (
                <div key={i}>
                    <CustomTextField name={`sections.${index}.fields.${i}.value`} control={control} label={item.name} />
                    {errors && <p className="required"> {getErrorMessage(i)}</p>}
                </div>
            ))}

            <ActionButton
                iconProps={addIcon}
                text="Add new field"
                onClick={() => append(new SectionFieldModel({ name: 'new', value: '' }))}
            />
        </SectionWrapper>
    );
};
