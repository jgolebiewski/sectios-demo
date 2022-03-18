
import React, { useEffect } from 'react';
import { ReportModel } from '../../domain/ReportModel';
import { Section } from '../Section/Section';
import { ActionButton, DefaultButton, Icon, IIconProps, IPivotItemProps, Pivot, PivotItem, PrimaryButton, Stack } from '@fluentui/react';
import { useState } from 'react';
import { SectionModel } from '../../domain/SectionModel';
import { ReportWrapper, TittleWrapper } from './Report.styled';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { OverView } from '../Overview/Overview';


export const Report: React.FunctionComponent<{ report: ReportModel }> = ({ report }) => {
    const addIcon: IIconProps = { iconName: 'Add' };
    const [reportModel, setReportModel] = useState<ReportModel>(report);

    const methods = useForm<ReportModel>({
        defaultValues: {
            sections: report.sections,
            overview: report.overview,
        }
    });



    const { fields: sections, append: appendSection } = useFieldArray({
        name: 'sections',
        control: methods.control
    });


    useEffect(() => {
        console.log('Rendering report');
    })


    const handleAddNewSection = () => {

        appendSection(new SectionModel({ name: `Section ${sections.length + 1}`, fields: [] }))
    }

    const handleValidator = () => {
        const copy = reportModel.clone();
        // copy.sections.forEach(s => s.validate());
        setReportModel(copy);
    }

    const onSubmit = (data: any) => {
        console.log('submit', { data }, { reportModel });
    }

    const customRenderer = (link?: IPivotItemProps, defaultRenderer?: (link?: IPivotItemProps) => JSX.Element | null,) => {

        if (!link || !defaultRenderer) {
            return null;
        }

        let icon = '';
        let color = '';

        return (
            <span style={{ flex: '0 1 100%' }}>
                {defaultRenderer({ ...link, itemIcon: undefined })}
                <Icon iconName={icon} style={{ color: color }} />
            </span>
        );
    }

    return <ReportWrapper>
        <TittleWrapper>
            <h1> {reportModel.name} </h1>
            <ActionButton iconProps={addIcon} text='Add new section' onClick={handleAddNewSection} />
        </TittleWrapper>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <OverView />
                <Pivot>

                    {
                        sections.map((section: SectionModel, index) => (
                            <PivotItem headerText={section.name} key={section.id} onRenderItemLink={customRenderer}>
                                <Section index={index} />
                            </PivotItem>
                        ))
                    }
                </Pivot>
                <Stack horizontal>
                    <PrimaryButton text='Save' type="submit" />
                    <DefaultButton text='Validate' onClick={handleValidator} />
                </Stack>
            </form>
        </FormProvider>

    </ReportWrapper>

}