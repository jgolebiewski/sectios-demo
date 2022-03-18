import { ActionButton, Icon, IIconProps, IPivotItemProps, Pivot, PivotItem, Stack } from '@fluentui/react';
import { FC } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Wrapper } from '../../common/Wrapper/Wrapper.styled';
import { ReportModel } from '../../domain/ReportModel';
import { SectionModel } from '../../domain/SectionModel';
import { Section } from '../Section/Section';
import { SectionHeader } from './Sections.styled';

interface SectionsProps {
    name?: string;
}
const addIcon: IIconProps = { iconName: 'Add' };

export const Sections: FC<SectionsProps> = (props) => {
    const context = useFormContext<ReportModel>();
    const { fields: sections, append: appendSection } = useFieldArray({
        name: 'sections',
        control: context.control
    });


    const handleAddNewSection = () => {

        appendSection(new SectionModel({ name: `Section ${sections.length + 1}`, fields: [] }))
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

    return <Wrapper>
        <Stack horizontalAlign='space-between' horizontal verticalAlign='center'>
            <SectionHeader>Sections</SectionHeader>
            <ActionButton iconProps={addIcon} text='Add new section' onClick={handleAddNewSection} />
        </Stack>

        <Pivot>
            {
                sections.map((section: SectionModel, index) => (
                    <PivotItem headerText={section.name} key={section.id} onRenderItemLink={customRenderer}>
                        <Section index={index} />
                    </PivotItem>
                ))
            }
        </Pivot>
    </Wrapper>
}