import moment from 'moment';
import { object, date, ref, array, number, string } from 'yup';
import { DEFAULT_DATE_FORMAT } from '../../../core/defaults';

export const reportCreatorSchema = object({
    meansOfTransport: array().of(string()).min(1, 'Select at least one option'),
    countries: array().of(string()).min(1, 'Select at least one country'),
    from: date().typeError('Provide valid date').required('Field From is required'),
    to: date()
        .typeError('Provide valid date')
        .required('Field To is required')
        .min(ref('from'), ({ min }) => `Date need to be before ${moment(min).format(DEFAULT_DATE_FORMAT)}`),
    numberOfPeople: number()
        .typeError('The number of people must be a number')
        .moreThan(0, 'The number of people must be greater then 0')
        .integer('Provide only numbers')
        .required('Provide number of people'),
}).required();
