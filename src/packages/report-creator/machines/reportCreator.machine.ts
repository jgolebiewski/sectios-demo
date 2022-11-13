import { createMachine, assign } from 'xstate';
import { DateService } from '../../../core/services/DateService';
import { DraftReportContext } from '../domain/types';

const report = {
    from: '',
    to: '',
    numberOfPeople: 0,
    meansOfTransport: [],
    countries: [],
};

const reportContext: DraftReportContext = {
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
                    | { type: 'START' }
                    | { type: 'NEXT' }
                    | { type: 'PREV' }
                    | { type: 'FINISH' }
                    | { type: 'FORM_CHANGE'; value: DraftReportContext },
                services: {} as {
                    saveReport: {
                        data: void;
                    };
                },
            },
            preserveActionOrder: true,
            predictableActionArguments: true,
            id: 'ReportCreator',
            initial: 'WELCOME',
            states: {
                WELCOME: {
                    on: {
                        START: {
                            target: 'CHOOSE_PERIOD',
                        },
                    },
                },
                CHOOSE_PERIOD: {
                    on: {
                        FORM_CHANGE: {
                            actions: 'assignFormChange',
                        },
                        NEXT: [
                            {
                                target: 'END_REPORT',
                                cond: 'lessThenFiveDays',
                            },
                            {
                                target: 'CHOOSE_COUNTRY',
                                cond: 'periodStateIsValid',
                            },
                        ],
                    },
                },
                FINISH: {
                    type: 'final',
                },
                CHOOSE_NUMBER_OF_PEOPLE: {
                    on: {
                        FORM_CHANGE: {
                            actions: 'assignFormChange',
                        },
                        NEXT: {
                            target: 'SUMMARY',
                            cond: 'chooseNumberOfPeopleIsValid',
                        },
                        PREV: {
                            target: 'CHOOSE_MEANS_OF_TRANSPORT',
                        },
                    },
                },
                SUMMARY: {
                    on: {
                        FINISH: {
                            target: 'SAVING_REPORT',
                            cond: 'chooseNumberOfPeopleIsValid',
                        },
                        PREV: {
                            target: 'CHOOSE_NUMBER_OF_PEOPLE',
                        },
                    },
                },
                ERROR_OCCURRED: {
                    type: 'final',
                },
                END_REPORT: {
                    type: 'final',
                },
                SAVING_REPORT: {
                    invoke: {
                        src: 'saveReport',
                        onDone: [
                            {
                                target: 'FINISH',
                                cond: 'reportIsValid',
                            },
                        ],
                        onError: [
                            {
                                target: 'ERROR_OCCURRED',
                            },
                        ],
                    },
                },
                CHOOSE_COUNTRY: {
                    on: {
                        FORM_CHANGE: {
                            actions: 'assignFormChange',
                        },
                        PREV: {
                            target: 'CHOOSE_PERIOD',
                        },
                        NEXT: {
                            target: 'CHOOSE_MEANS_OF_TRANSPORT',
                            cond: 'countriesIsValid',
                        },
                    },
                },
                CHOOSE_MEANS_OF_TRANSPORT: {
                    on: {
                        FORM_CHANGE: {
                            actions: 'assignFormChange',
                        },
                        PREV: {
                            target: 'CHOOSE_COUNTRY',
                        },
                        NEXT: {
                            target: 'CHOOSE_NUMBER_OF_PEOPLE',
                            cond: 'meansOfTransportIsValid',
                        },
                    },
                },
            },
        },
        {
            guards: {
                lessThenFiveDays: (context: DraftReportContext, _events) => {
                    const { from, to } = context.data;
                    return DateService.calculateDuration(from, to) <= 5;
                },
                periodStateIsValid: (context: DraftReportContext) => {
                    const { from, to } = context.formErrors || {};
                    if (from || to) {
                        return false;
                    }
                    return true;
                },
                chooseNumberOfPeopleIsValid: ({ formErrors }: DraftReportContext) => {
                    const { numberOfPeople } = formErrors || {};
                    return numberOfPeople ? false : true;
                },
                meansOfTransportIsValid: ({ formErrors }: DraftReportContext) => {
                    const { meansOfTransport } = formErrors || {};
                    return meansOfTransport ? false : true;
                },
                countriesIsValid: ({ formErrors }: DraftReportContext) => {
                    const { countries } = formErrors || {};
                    return countries ? false : true;
                },
                reportIsValid: ({ formErrors }: DraftReportContext) => {
                    if (!formErrors) {
                        return true;
                    }
                    console.log(Object.values(formErrors), formErrors);
                    return Object.values(formErrors).length === 0;
                },
            },
            actions: {
                assignFormChange: assign((context, event) => {
                    const ev = event as { type: 'FORM_CHANGE'; value: DraftReportContext };
                    return ev.value;
                }),
            },
        }
    );
