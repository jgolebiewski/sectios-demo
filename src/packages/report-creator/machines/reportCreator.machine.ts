import { setup, assign, fromPromise } from 'xstate';
import { DateService } from '../../../core/services/DateService';
import { DraftReport, DraftReportContext } from '../domain/types';

import { ReportFactory } from '../../../core/reportFactory';
import { ReportCreatorService } from '../services/ReportCreatorService';
import { v4 as uuidv4 } from 'uuid';

const report = {
    from: new Date(),
    to: new Date(),
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
    setup({
        types: {
            context: {} as DraftReportContext,
            events: {} as
                | { type: 'START' }
                | { type: 'NEXT' }
                | { type: 'PREV' }
                | { type: 'FINISH' }
                | { type: 'FORM_CHANGE'; value: DraftReportContext },
        },
        actions: {
            // poprawiona wersja – patrz niżej
            assignFormChange: assign(({ context, event }) => {
                if (event.type !== 'FORM_CHANGE') return {};
                // przykładowo: nadpisujemy cały context tym, co przyszło z formularza
                return {
                    ...event.value,
                };
            }),
        },
        actors: {
            saveReport: fromPromise(async ({ input }) => {
                console.log({ input });
                const { draft } = input as { draft: DraftReport };
                if (input === null) return;
                // typ inputu możesz sobie doprecyzować
                // const draft: DraftReport = { ...input.draft! };

                draft.creationDate = new Date();
                draft.id = uuidv4();

                const nreport = await ReportFactory.create(draft);
                // // zakładam, że saveReport zwraca Promise
                return ReportCreatorService.saveReport(nreport);
            }),
        },
        guards: {
            lessThenFiveDays: ({ context }) => {
                const { from, to } = context.data;
                const duration = DateService.calculateDuration(from, to);
                console.log({ duration }, { from }, { to }, { context });
                return duration <= 5;
            },
            periodStateIsValid: ({ context }) => {
                const { from, to } = context.formErrors || {};

                if (from || to) {
                    return false;
                }
                return true;
            },
            chooseNumberOfPeopleIsValid: ({ context }) => {
                const { numberOfPeople } = context.formErrors || {};
                return numberOfPeople ? false : true;
            },
            meansOfTransportIsValid: ({ context }) => {
                const { formErrors } = context;
                const { meansOfTransport } = formErrors || {};
                return meansOfTransport ? false : true;
            },
            countriesIsValid: ({ context }) => {
                const { formErrors } = context;
                const { countries } = formErrors || {};
                return countries ? false : true;
            },
            reportIsValid: ({ context }) => {
                const { formErrors } = context;
                if (!formErrors) {
                    return true;
                }
                console.log(Object.values(formErrors), formErrors);
                return Object.values(formErrors).length === 0;
            },
        },
    }).createMachine({
        context: reportContext,
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
                            guard: 'lessThenFiveDays',
                        },
                        {
                            target: 'CHOOSE_COUNTRY',
                            guard: 'periodStateIsValid',
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
                        guard: 'chooseNumberOfPeopleIsValid',
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
                        guard: 'chooseNumberOfPeopleIsValid',
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
                    input: ({ context }) => ({
                        draft: context.data,
                    }),
                    onDone: [
                        {
                            target: 'FINISH',
                            guard: 'reportIsValid',
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
                        guard: 'countriesIsValid',
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
                        guard: 'meansOfTransportIsValid',
                    },
                },
            },
        },
    });
