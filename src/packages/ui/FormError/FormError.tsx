import { FormErrorWrapper } from './FormError.styled';

export const FormError = ({ children }: { children: string | JSX.Element }): JSX.Element => {
    return <FormErrorWrapper>{children}</FormErrorWrapper>;
};
