import { ActionButton, Icon, IIconProps, IPivotItemProps, Pivot, PivotItem, Stack } from '@fluentui/react';
import { FC, useEffect } from 'react';
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
    const {
        control,
        formState: { errors },
    } = useFormContext<ReportModel>();

    const { fields: sections, append: appendSection } = useFieldArray({
        name: 'sections',
        control: control,
    });

    useEffect(() => {
        console.log('Rendering sections container ');
    });

    const handleAddNewSection = () => {
        appendSection(
            new SectionModel({
                name: `Section ${sections.length + 1}`,
                fields: [],
            })
        );
    };

    const customRenderer = (
        link?: IPivotItemProps,
        defaultRenderer?: (item?: IPivotItemProps) => JSX.Element | null
    ) => {
        if (!link || !defaultRenderer) {
            return null;
        }

        const { itemKey } = link;
        let icon = '';
        let color = '';

        if (errors && errors.sections && itemKey) {
            color = errors.sections[+itemKey] ? 'red' : '';
            icon = errors.sections[+itemKey] ? 'Important' : '';
        }

        return (
            <span style={{ flex: '0 1 100%' }}>
                {defaultRenderer({ ...link })}
                {icon && <Icon iconName={icon} style={{ color: color }} />}
            </span>
        );
    };

    return (
        <Wrapper>
            <Stack horizontalAlign="space-between" horizontal verticalAlign="center">
                <SectionHeader>Sections</SectionHeader>
                <ActionButton iconProps={addIcon} text="Add new section" onClick={handleAddNewSection} />
            </Stack>

            <Pivot>
                {sections.map((section: SectionModel, index) => (
                    <PivotItem headerText={section.name} key={section.id} onRenderItemLink={customRenderer}>
                        <Section index={index} />
                    </PivotItem>
                ))}
            </Pivot>
        </Wrapper>
    );
};
