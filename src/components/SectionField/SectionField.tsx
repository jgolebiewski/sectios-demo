import { TextField } from '@fluentui/react';
import React from 'react';

import { FieldWrapper } from './SectionField.styled';

export const SectionField = (props: any) => {


    return <FieldWrapper>

        <TextField {...props} />

    </FieldWrapper>
}