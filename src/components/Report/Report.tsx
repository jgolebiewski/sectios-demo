
import React, { useCallback, useEffect } from 'react';
import { ReportModel } from '../../domain/ReportModel';
import { Section } from '../Section/Section';
import { ActionButton, DefaultButton, Icon, IIconProps, IPivotItemProps, Pivot, PivotItem, PrimaryButton, Stack, TextField } from '@fluentui/react';
import { useState } from 'react';
import { SectionModel } from '../../domain/SectionModel';
import { ReportWrapper, TittleWrapper } from './Report.styled';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { SectionFieldModel } from '../../domain/SectionFieldModel';


type FormValues = {
    sections: SectionModel[];
};


export const Report: React.FunctionComponent<{ report: ReportModel }> = ({ report }) => {
    const addIcon: IIconProps = { iconName: 'Add' };
    const [reportModel, setReportModel] = useState<ReportModel>(report);

    const { control, register, handleSubmit } = useForm<ReportModel>({
        defaultValues: {
            sections: report.sections
        }
    });



    const { fields: sections, append: appendSection } = useFieldArray({
        name: 'sections',
        control: control
    });

    // const { fields, append: appendField } = useFieldArray({
    //     name: `sections.0.fields`,
    //     control: methods.control
    // });

    console.log('top', control);

    useEffect(() => {
        console.log('Rendering report');
    })

    const handleAddNewField = (sectionIndex: number) => {
        // const field = new SectionFieldModel({ name: 'New', value: '' });
        // reportModel.sections[sectionIndex].fields.push(field);
        // console.log(field);
        // appendField(field);
    }

    const handleReport = () => {
        console.log(reportModel);
    }

    const handleAddNewSection = () => {
        // const copy = reportModel.clone();
        // copy.sections.push(
        //     new SectionModel({ name: `Section ${reportModel.sections.length + 1}`, fields: [] })
        // );

        appendSection(new SectionModel({ name: `Section ${reportModel.sections.length + 1}`, fields: [] }))
        // setReportModel(copy);
    }

    const handleValidator = () => {
        const copy = reportModel.clone();
        // copy.sections.forEach(s => s.validate());
        setReportModel(copy);
    }

    const onSubmit = (data: any) => console.log('submit', { data });

    const customRenderer = (link?: IPivotItemProps, defaultRenderer?: (link?: IPivotItemProps) => JSX.Element | null,) => {
        console.log('customRenderer');
        if (!link || !defaultRenderer) {
            return null;
        }

        let icon = '';
        let color = '';

        // if (link.itemKey) {
        // const sectionModel = reportModel.sections[+link.itemKey] as SectionModel;
        // sectionModel.validate();

        // }



        return (
            <span style={{ flex: '0 1 100%' }}>
                {defaultRenderer({ ...link, itemIcon: undefined })}
                <Icon iconName={icon} style={{ color: color }} />
            </span>
        );
    }


    // const handleSectionChange = useCallback((index: number) => (item: SectionModel) => {

    //     const copy = reportModel.clone();
    //     copy.sections[index] = item;
    //     console.log(methods.formState.errors);
    //     setReportModel(reportModel);
    // }, [reportModel, methods]);

    return <ReportWrapper>
        <TittleWrapper>
            <h1> {reportModel.name} </h1>
            <ActionButton iconProps={addIcon} text='Add new section' onClick={handleAddNewSection} />
        </TittleWrapper>

        <form onSubmit={handleSubmit(onSubmit)}>
            <Pivot>

                {
                    sections.map((section: SectionModel, index) => (
                        <PivotItem headerText={section.name} key={section.id} onRenderItemLink={customRenderer}>
                            <Section control={control} register={register} index={index} />
                            <ActionButton iconProps={addIcon} text='Add new field' onClick={() => handleAddNewField(index)} />
                        </PivotItem>
                    ))
                }
            </Pivot>
            <Stack horizontal>
                <PrimaryButton text='Save' type="submit" />
                <DefaultButton text='Validate' onClick={handleValidator} />
            </Stack>
        </form>

    </ReportWrapper>

}