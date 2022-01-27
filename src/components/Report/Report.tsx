
import * as React from 'react';
import { ReportModel } from '../../domain/ReportModel';
import { Section } from '../Section/Section';
import { ActionButton, DefaultButton, Icon, IIconProps, IPivotItemProps, Pivot, PivotItem, PrimaryButton, Stack } from '@fluentui/react';
import { useState } from 'react';
import { SectionModel } from '../../domain/SectionModel';
import { ReportWrapper, TittleWrapper } from './Report.styled';




export const Report: React.FunctionComponent<{ report: ReportModel }> = ({ report }) => {
    const addIcon: IIconProps = { iconName: 'Add' };
    const [reportModel, setReportModel] = useState<ReportModel>(report);

    const handleReport = () => {
        console.log(reportModel);
    }

    const handleAddNewSection = () => {
        const copy = reportModel.clone();
        copy.sections.push(
            new SectionModel({ name: `Section ${reportModel.sections.length + 1}`, fields: [] })
        );

        setReportModel(copy);
    }

    const handleValidator = () => {
        const copy = reportModel.clone();
        copy.sections.forEach(s => s.validate());
        setReportModel(reportModel);
    }

    const customRenderer = (link?: IPivotItemProps, defaultRenderer?: (link?: IPivotItemProps) => JSX.Element | null,) => {
        console.log('customRenderer');
        if (!link || !defaultRenderer) {
            return null;
        }

        let icon = '';
        let color = '';

        if (link.itemKey) {
            const sectionModel = reportModel.sections[+link.itemKey] as SectionModel;
            icon = sectionModel.isValid ? 'Accept' : 'Important';
            color = sectionModel.isValid ? 'green' : 'red';
        }



        return (
            <span style={{ flex: '0 1 100%' }}>
                {defaultRenderer({ ...link, itemIcon: undefined })}
                <Icon iconName={icon} style={{ color: color }} />
            </span>
        );
    }


    const handleSectionChange = (index: number) => (item: SectionModel) => {

        const copy = reportModel.clone();
        copy.sections[index] = item;

        setReportModel(reportModel);
    }

    return <ReportWrapper>
        <TittleWrapper>
            <h1> {reportModel.name} </h1>
            <ActionButton iconProps={addIcon} text='Add new section' onClick={handleAddNewSection} />
        </TittleWrapper>

        <Pivot>

            {
                reportModel.sections.map((section, index) => (
                    <PivotItem headerText={section.name} key={section.id} onRenderItemLink={customRenderer}>
                        <Section section={section} onChange={handleSectionChange(index)} />
                    </PivotItem>
                ))
            }
        </Pivot>
        <Stack horizontal>
            <PrimaryButton text='Save' onClick={handleReport} />
            <DefaultButton text='Validate' onClick={handleValidator} />
        </Stack>

    </ReportWrapper>

}