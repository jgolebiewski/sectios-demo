import { createActor, fromPromise } from 'xstate';

import flushPromises from 'flush-promises';

import { reportCreateMachine } from './reportCreator.machine';
import { vi } from 'vitest';

const mockMachine = reportCreateMachine;

describe('Report Create Machine', () => {
    it('should reach END_REPORT state when period is shorter then 5 days', async () => {
        const spy = vi.fn();

        const actor = createActor(mockMachine);

        actor.start();

        const ctx = actor.getSnapshot().context;

        actor.send({ type: 'START' });

        const ctxAfterStart = actor.getSnapshot().context;

        actor.send({
            type: 'FORM_CHANGE',
            value: {
                ...ctxAfterStart,
                data: {
                    ...ctxAfterStart.data,
                    from: new Date(),
                    to: new Date(),
                },
            },
        });

        expect(actor.getSnapshot().matches('CHOOSE_PERIOD')).toBeTruthy();

        actor.send({ type: 'NEXT' });

        await flushPromises();

        expect(actor.getSnapshot().matches('END_REPORT')).toBeTruthy();
    });

    it('should not go to CHOOSE_COUNTRY when CHOOSE_PERIOD is invalid', async () => {
        // const mockMachine = reportCreateMachine;
        const actor = createActor(mockMachine);

        actor.start();
        actor.send({ type: 'START' });

        const ctx = actor.getSnapshot().context;

        actor.send({
            type: 'FORM_CHANGE',
            value: {
                ...ctx,
                data: {
                    ...ctx.data,
                    from: new Date('2024-12-12'),
                    to: new Date(),
                },
                formErrors: {
                    ...ctx.formErrors,
                    from: { type: 'some' },
                },
            },
        });

        actor.send({ type: 'NEXT' });

        expect(actor.getSnapshot().matches('CHOOSE_PERIOD')).toBeTruthy();
    });

    it('should call service on FINISH', async () => {
        let called = false;

        const machine = mockMachine.provide({
            actors: {
                saveReport: fromPromise(async ({ input }) => {
                    called = true;
                    return Promise.resolve(true);
                }),
            },
        });

        const actor = createActor(machine);

        actor.start();
        actor.send({ type: 'START' });

        const ctx = actor.getSnapshot().context;
        actor.send({
            type: 'FORM_CHANGE',
            value: {
                ...ctx,
                data: {
                    from: new Date('2024-12-10'),
                    to: new Date('2024-12-20'),
                    countries: ['PL1'],
                    meansOfTransport: ['1'],
                    numberOfPeople: 2,
                },
                formErrors: {},
            },
        });
        actor.send({ type: 'NEXT' }); // CHOOSE_PERIOD -> CHOOSE_COUNTRY / END_REPORT itd.
        actor.send({ type: 'NEXT' });
        actor.send({ type: 'NEXT' });
        actor.send({ type: 'NEXT' }); // aż dojdziesz do SUMMARY (jak w Twojej sekwencji)
        actor.send({ type: 'FINISH' }); // powinno wejść w SAVING_REPORT i wywołać saveReport

        await flushPromises();

        expect(actor.getSnapshot().matches('FINISH')).toBeTruthy();
        expect(called).toBeTruthy();
    });

    it('should end with ERROR_OCCURRED state', async () => {
        const machine = reportCreateMachine.provide({
            actors: {
                saveReport: fromPromise(async ({ input }) => {
                    throw new Error('Error');
                }),
            },
        });

        const actor = createActor(machine);

        actor.start();
        actor.send({ type: 'START' });

        // ustawiamy poprawne dane tak jak w teście v4, ale eventem:
        const ctx = actor.getSnapshot().context;

        actor.send({
            type: 'FORM_CHANGE',
            value: {
                ...ctx,
                data: {
                    ...ctx.data,
                    from: new Date('2022-10-11'),
                    to: new Date('2022-10-21'),
                    countries: ['PL1'],
                    meansOfTransport: ['1'],
                    numberOfPeople: 2,
                },
                formErrors: {},
            },
        });

        // przejście przez CHOOSE_PERIOD → ... → SUMMARY
        actor.send({ type: 'NEXT' });
        actor.send({ type: 'NEXT' });
        actor.send({ type: 'NEXT' });
        actor.send({ type: 'NEXT' });
        actor.send({ type: 'FINISH' });

        await flushPromises();

        expect(actor.getSnapshot().matches('ERROR_OCCURRED')).toBeTruthy();
    });
});
