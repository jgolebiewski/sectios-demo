import moment from 'moment';
import { object, date, ref, array, string } from 'yup';
import { DEFUALT_DATE_FORMAT } from '../../../core/defaults';

export const reportCreatorSchema = object({
    meansOfTransport: array().of(string()).min(1, 'Select at least one option'),
    countries: array().of(string()).min(1, 'Select at least one country'),
    from: date().required('Field FROM is required'),
    to: date()
        .required('Field TO is required')
        .min(ref('from'), ({ min }) => `Date need to be before ${moment(min).format(DEFUALT_DATE_FORMAT)}`),
}).required();
