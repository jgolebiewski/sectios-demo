import { interpret } from 'xstate';
import { done } from 'xstate/lib/actions';
import flushPromises from 'flush-promises';

import { reportCreateMachine } from './reportCreator.machine';

const mockMachine = reportCreateMachine.withConfig({
    services: {
        saveReport: async (context, _event) => {
            const draft = context.data;
            draft.creationDate = new Date();
            draft.id = '_unique_id_';
            return Promise.resolve(draft);
        },
    },
});

describe('Report Create Machine', () => {
    it('should reach END_REPORT state when period is shorter then 5 days', async () => {
        const spy = jest.fn();

        const service = interpret(mockMachine).onTransition((state) => {
            const { value, context } = state;
            context.data.from = new Date('2022-10-10').toISOString();
            context.data.to = new Date('2022-10-11').toISOString();
            spy({ value, context });
        });

        const ctx = service.getSnapshot().context;

        service.start();
        service.send({ type: 'START' });
        expect(service.getSnapshot().matches('CHOOSE_PERIOD')).toBeTruthy();

        service.send({ type: 'FORM_CHANGE', value: ctx });
        service.send({ type: 'NEXT' });
        await flushPromises();

        expect(service.getSnapshot().matches('END_REPORT')).toBeTruthy();
    });

    it('should not go to CHOOSE_COUNTRY when CHOOSE_PERIOD is invalid', async () => {
        const service = interpret(mockMachine).onTransition((state) => {
            const { value, context } = state;
            context.data.from = '';
            context.data.to = '';
            context.formErrors = {
                from: { type: 'some' },
            };

            if (state.matches('CHOOSE_PERIOD')) {
                done('CHOOSE_PERIOD', {});
            }
        });

        const ctx = service.getSnapshot().context;

        service.start();
        service.send({ type: 'START' });

        service.send({ type: 'FORM_CHANGE', value: ctx });
        service.send({ type: 'NEXT' });

        expect(service.getSnapshot().matches('CHOOSE_PERIOD')).toBeTruthy();
    });

    it('should call service on FINISH', async () => {
        let called = false;

        const machine = reportCreateMachine.withConfig({
            services: {
                saveReport: (context, _event) => {
                    called = true;
                    return Promise.resolve(true);
                },
            },
        });

        const service = interpret(machine).onTransition((state) => {
            if (state.matches('FINISH')) {
                expect(called).toBeTruthy();
                done('FINISH');
            }
        });
        service.start();
        service.send({ type: 'START' });
        service.send({ type: 'NEXT' });
        service.send({ type: 'NEXT' });
        service.send({ type: 'NEXT' });
        service.send({ type: 'NEXT' });
        service.send({ type: 'FINISH' });
        await flushPromises();
    });

    it('should end with ERROR_OCCURRED state', async () => {
        const machine = reportCreateMachine.withConfig({
            services: {
                saveReport: (_context, _event) => {
                    console.log('reject');
                    return Promise.reject('Error');
                },
            },
        });

        const service = interpret(machine).onTransition((state) => {
            const { context } = state;
            context.data.from = new Date('2022-10-10').toISOString();
            context.data.to = new Date('2022-10-21').toISOString();
            context.data.countries = ['PL'];
            context.data.meansOfTransport = ['1'];
            context.data.numberOfPeople = 2;
            context.formErrors = {};

            if (state.matches('ERROR_OCCURRED')) {
                done('ERROR_OCCURRED');
            }
        });
        service.start();
        service.send({ type: 'START' });
        service.send({ type: 'NEXT' });
        service.send({ type: 'NEXT' });
        service.send({ type: 'NEXT' });
        service.send({ type: 'NEXT' });
        service.send({ type: 'FINISH' });
        await flushPromises();

        expect(service.getSnapshot().matches('ERROR_OCCURRED')).toBeTruthy();
    });
});
