import { FieldErrorsImpl } from 'react-hook-form';
import { createMachine, assign } from 'xstate';
import { DateService } from '../../../core/services/DateService';

export interface Report {
    from: string;
    to: string;
    numberOfPeople: number | null;
    meansOfTransport: string[];
    countries: string[];
}
export type ReportErrors = FieldErrorsImpl<Report>;

export interface ReportContext {
    data: Report;
    formErrors: ReportErrors | null;
}

const report = {
    from: '',
    to: '',
    numberOfPeople: 0,
    meansOfTransport: [],
    countries: [],
};

const reportContext: ReportContext = {
    data: report,
    formErrors: null,
};

export const reportCreateMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QCUwAcD2AnALgYSzAEMdsA6AdTABsBjDAWzAGIBlHI3AbQAYBdRKEywAljhEYAdoJAAPRAEYAbAGYySngE4VS5UoAcAJlX6VAGhABPRAFYA7PrKbnm3foAsmhTxv6Avn4WqJi4BMSkWGR4ABYYGLBgAAQACmBYEhDMAHJgsji8AkggwmIS0kXyCN6ajip2nrrGKgruKpoW1gjuNkpkNjwD3nYtGpqGKgFB6Nj4hCTkMXEJKWkZ2bn5CoVC8aVSMpVKNepaKiruCnYqPIbdHYjurU4umv1KqoYKypMgwTNh80ii3iSUkAFcGAAjNKJDAAM0SaDAGDQ1BYADERJIRLBogUZCVxPsKohDPpHDZtPV9Ao2mNnHZ7lUeL1+gMtDY2vYDO4fn9QnMIlFYiDEuCoTD4YjkaiWMlCAA3fFFQllA6II6OUZnC5XG53Kyko5kOzsnjuBz1Yz+QK-aYC8LkVhEBVYqCJQghHDMCBSMBkLEKjAAa39-NmjsiztdkndnpmCEDGFoJDKBWVO1ERPKoEql2uZH0lLJnyUDl1TIUNkMZDO5y0qmaZZUNj59ojgLI0bdHvbzDSWHIqJIcOwDDI4YBQu7sd7XsTkiDKez6f4BN22fVCGLZE++jsPU8rS07iZXkLdfcWk05pqCjbXqnCxFyzwGDBkhwWEszHlYCVa4qhuaokggmonNo5z5vqNhMp4NjPC4ChGCyN6aA+-yCs+SxJG+H5fj+OR5BmxTAcSuYasc2pQXqtywYaCAqJ8JpmlWuquEoGEOp2wLLAAssQkiwLCCJfkQQlerAv6KiRqrkXIlFaqcNHXHRTJ1GoRwuEYrh6HUXEdkKvFJAJ4nCVKYkSTMUlEfkgGZnsOYKWBVHKbqqkGp0nx2Cx7L6DwZw+KanE-JIGAQHAMiTlhkRUHQjBgOuWYgRRXSGEy9iaGQnjODSGg8PUBUGU+QIvkkqTpOFSWOVuVImq4pg9DeyGMgx3S9C8dhda8e7FTFZCYtiuLVZuoEKGM7iFjebxKNWmj1JW1a1nWwVKO4hiUgohh9ZGwo4WKELQlgInSiiaIjSlznrUye67uyhhdR4RyXHYO2dgAolgg7HcmtBgl9kAXfJlQOJp+7uEY+ivD4phnjWdbXP5wzeDyb1Cu9kgQIk4ZA05eZnI41TXDehg8ONrWdO1fT3Y8yh2MYmi8ra0W7TOcbtrjW5tGoe4HjcdhjOSxhMqYZBmjcDPVjYNj3sz7YlXtop4Z+36c2NEMmi25LUr4AyeYgGnqC49gPTeKgeGj2GiqZQknZZsCSWrqVeJNwz6GWyH7rNZOVlcYvsrSPR0gL21y4+MVO85AC0ShMlHCEvP5PRkpyLsBAEQA */
    createMachine(
        {
            context: reportContext,
            schema: {
                events: {} as
                    | { type: 'Start' }
                    | { type: 'Next' }
                    | { type: 'Prev' }
                    | { type: 'Finish' }
                    | { type: 'FormChange'; value: ReportContext },
                services: {} as {
                    saveReport: {
                        data: void;
                    };
                    loadCountries: {
                        data: void;
                    };
                },
            },
            preserveActionOrder: true,
            predictableActionArguments: true,
            id: 'ReportCreator',
            initial: 'Welcome',
            states: {
                Welcome: {
                    on: {
                        Start: {
                            target: 'Choose Period',
                        },
                    },
                },
                'Choose Period': {
                    on: {
                        FormChange: {
                            actions: 'assignFormChange',
                        },
                        Next: [
                            {
                                target: 'End Report',
                                cond: 'Less then 5 days',
                            },
                            {
                                target: 'Choose Country',
                                cond: 'periodStateIsValid',
                            },
                        ],
                    },
                },
                Finish: {
                    type: 'final',
                },
                'Choose number of people': {
                    on: {
                        FormChange: {
                            actions: 'assignFormChange',
                        },
                        Next: {
                            target: 'Summary',
                            cond: 'chooseNumberOfPeopleIsValid',
                        },
                        Prev: {
                            target: 'Choose Means of transports',
                        },
                    },
                },
                Summary: {
                    on: {
                        Finish: {
                            target: 'Saving report',
                            cond: 'chooseNumberOfPeopleIsValid',
                        },
                        Prev: {
                            target: 'Choose number of people',
                        },
                    },
                },
                'Error occurred': {},
                'End Report': {
                    type: 'final',
                },
                'Saving report': {
                    invoke: {
                        src: 'saveReport',
                        onDone: [
                            {
                                target: 'Finish',
                                cond: 'reportIsValid',
                            },
                        ],
                        onError: [
                            {
                                target: 'Error occurred',
                            },
                        ],
                    },
                },
                'Choose Country': {
                    on: {
                        FormChange: {
                            actions: 'assignFormChange',
                        },
                        Prev: {
                            target: 'Choose Period',
                        },
                        Next: {
                            target: 'Choose Means of transports',
                            cond: 'countriesIsValid',
                        },
                    },
                },
                'Choose Means of transports': {
                    on: {
                        FormChange: {
                            actions: 'assignFormChange',
                        },
                        Prev: {
                            target: 'Choose Country',
                        },
                        Next: {
                            target: 'Choose number of people',
                            cond: 'meansOfTransportIsValid',
                        },
                    },
                },
            },
        },
        {
            guards: {
                'Less then 5 days': (context: ReportContext, _events) => {
                    const { from, to } = context.data;
                    return DateService.calculateDuration(from, to) <= 5;
                },
                periodStateIsValid: (context: ReportContext) => {
                    const { from, to } = context.formErrors || {};
                    if (from || to) {
                        return false;
                    }
                    return true;
                },
                chooseNumberOfPeopleIsValid: ({ formErrors }: ReportContext) => {
                    const { numberOfPeople } = formErrors || {};
                    return numberOfPeople ? false : true;
                },
                meansOfTransportIsValid: ({ formErrors }: ReportContext) => {
                    const { meansOfTransport } = formErrors || {};
                    return meansOfTransport ? false : true;
                },
                countriesIsValid: ({ formErrors }: ReportContext) => {
                    const { countries } = formErrors || {};
                    return countries ? false : true;
                },
                reportIsValid: ({ formErrors }: ReportContext) => {
                    console.log({ formErrors });
                    if (!formErrors) {
                        return true;
                    }
                    console.log(Object.values(formErrors), formErrors);
                    return Object.values(formErrors).length === 0;
                },
            },
            actions: {
                assignFormChange: assign((context, event) => {
                    const ev = event as { type: 'FormChange'; value: ReportContext };
                    return ev.value;
                }),
            },
        }
    );
