import moment from 'moment';

const calculateDuration = (start: string | null | Date, end: string | null | Date): number => {
    const endDateMoment = moment(end);
    const startDateMoment = moment(start);
    return moment.duration(endDateMoment.diff(startDateMoment)).asDays();
};

export const DateService = {
    calculateDuration,
};
