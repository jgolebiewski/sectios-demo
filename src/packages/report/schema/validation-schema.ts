import * as yup from 'yup';
import { object, date, ref, array, number, string } from 'yup';
import moment from 'moment/moment';
import { DEFAULT_DATE_FORMAT } from '../../../core/defaults';

export const schema = yup
    .object({
        sections: yup.array().of(
            yup.object().shape({
                fields: yup.array().of(
                    yup.object().shape({
                        value: yup.string().required('This field is required'),
                    })
                ),
            })
        ),
        routes: yup.array().of(
            yup.object().shape({
                name: yup.string().required('This field is required'),
                startDate: yup.string().required('Please provide start date'),
                endDate: yup.string().required('Please provide end date'),
            })
        ),
        overview: yup.object().shape({
            name: yup.string().required('This field is required'),
            author: yup.string().optional(),
        }),
    })
    .required();

const periodSection = object().shape({
    from: date().typeError('Provide valid date').required('Field From is required'),
    to: date()
        .typeError('Provide valid date')
        .required('Field To is required')
        .min(ref('from'), ({ min }) => `Date need to be before ${moment(min).format(DEFAULT_DATE_FORMAT)}`),
});

const countriesSection = array().of(
    object().shape({
        cities: array().of(string()).min(1, 'Select at least one option'),
        meansOfTransportOption: array().of(string()).min(1, 'Select at least one option'),
        accommodationOption: array().of(string()).min(1, 'Select at least one option'),
        period: periodSection,
    })
);

export const reportValidationSchema = object({
    countrySectionForm: countriesSection,
    budgetAssumed: number()
        .typeError('The budget must be a number')
        .moreThan(0, 'The budget must be greater then 0')
        .integer('Provide only numbers')
        .required('Provide budget'),
    budgetSpent: number()
        .typeError('The budget must be a number')
        .moreThan(0, 'The budget must be greater then 0')
        .integer('Provide only numbers')
        .required('Provide budget'),
    vacationPeriod: periodSection,
}).required();
