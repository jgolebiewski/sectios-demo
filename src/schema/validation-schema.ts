import * as yup from 'yup';

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
