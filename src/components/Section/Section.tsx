import * as React from 'react';
import { SectionModel } from '../../domain/SectionModel';
import { SectionField } from '../SectionField/SectionField';
import { SectionWrapper } from './Section.styled';
import { useState } from 'react';
import { ActionButton, IIconProps } from '@fluentui/react';
import { SectionFieldModel } from './../../domain/SectionFieldModel';


export const Section: React.FunctionComponent<{
    section: SectionModel, 
    onChange: (item: SectionModel) => void}> = ({ section, onChange }) => {
    
    const addIcon: IIconProps = { iconName: 'Add' };
    
    const [sectionModel, setSectionModel] = useState<SectionModel>(section);

    const handeOnChange = (index: number) => (newValue: string) => {
    
        const copy = sectionModel.clone();
        copy.fields[index].value = newValue;
        copy.validate();
        setSectionModel(copy);
        onChange(sectionModel);

    }

    const handleAddNewField = () => {
        const currentIndex = section.fields.length;
        const field = new SectionFieldModel({name: `Field ${currentIndex}`, value: ''});
        const copy = sectionModel.clone();
        copy.fields.push(field);
        copy.validate();
        setSectionModel(copy);
    }

    return <SectionWrapper>
        <h5>{sectionModel.name}</h5>
        {
            sectionModel.fields.map((field, index) => 
            (<SectionField key={field.id} sectionField={field}  onChange={handeOnChange(index)} />)
            )
        }

        <ActionButton iconProps={addIcon} text='Add new field' onClick={handleAddNewField}/>
    </SectionWrapper>
}