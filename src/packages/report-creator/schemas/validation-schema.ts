import moment from 'moment';
import { object, date, ref } from 'yup';
import { DEFUALT_DATE_FORMAT } from '../../../core/defaults';

export const reportCreatorSchema = object({
    from: date().required('Field FROM is required'),
    to: date()
        .required('Field TO is required')
        .min(ref('from'), ({ min }) => `Date need to be before ${moment(min).format(DEFUALT_DATE_FORMAT)}`),
}).required();
