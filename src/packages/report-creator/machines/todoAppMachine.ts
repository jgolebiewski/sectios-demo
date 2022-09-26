import { createMachine, assign } from 'xstate';

export const todoMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALqJQAB1nFV6-SAAeiALQAmAOy2KW+wDYAjPa3uAzK4AcACwArK4+ADQgAJ42gQ7OgfaB-sG2QVqpvgC+WZFCOAQknBL0pIxCbGAATlWoVRQGADYqAGZ12BT5IkXitKXlMnIKSqaauuZGsCZqpOZWCNapToGeAJz+9sHuHrau9pExC+7B-hSpPrZaq7v27lr39jl5MgWinBWYJZCsAMJVYCowJhyAB3CbGUZzRDBZyrDL+Hw+fyuWyBVbBHyBA42Wy2dwUVbuQmuVY+RzBQJonxPEBdQpiTqDT59b4AETAjTAyjA4KmkKQlkQhIJYXu7nFd2uEWiNlcrhh9iSaMJ7jSqsCNLpb0ofwBqjKmFwwLAIMwyhkFAAyoRUCCpC1athMGQDABXZSsABi7WdpDdykwRFwZUgvOmZgF80WTi0yXcIR8qUyWls2IWqwogVju1ciWC3i0-nc-k1L26DN1KikRtBZot1tt9sdvv9rEtroARtgTGH+aB5jczsc-FpXKO4bs0-YfBR5Y4iaKfKPPKWMK8ehRK-rGDWTXWMFbcNwpOaMOx1JQFAJGWvy5wt9XjabT6hD8eDS-5KReCMZto9AKkzhrMkaIEu+JLiSdyeBsS7TmmdhLrCfhZh4Pi+Ohq7CPS97-FWBq7s+9ZHieMisNUtT1E0rTtDe2HapueHboaT77q+lokR+Mhfj+VbqP+vYzFCCDbPiubBHCKQOJ4o7Socxz2JmS4IrGEmiriWHrgy7KcsxL7npwV6CGWOGUDpXKkRgPGKHxYwAYYEJCaBInJBQniOEkuInCSDgIW4pxqrYWyEpcxbUrktImQx5l6WRFF1A0zTKG0VQdFqG4xZZqDWb+-HjIBjkRv2iAeIEZxyqEqwrMkuIIWiTirPYUobN4mwnJpd5mRyFlcWu8X-BAbYGGAkCYK6BiCUVgoIIkGZwnCJyJtcSSrHVvgUImlxxMcqL+OsGoRel2ndbFfU1HU3wWLAyiAhQuAtNyVQABSXPcACUrBHZwmW9Vg-WhgVfJOcVM3FpmWZNRJI7rGSCG7KcqqbIEPirCiVVXDkEWkOgcDmF9vSSAaFSTSBIOLKkFBFvGioSUW-gIghwRJG5YRBWKyLFiWh1RRuHxfBAJPCU4or2MiFLElsWx1UiFC7bmCJuOssYHc8t6mdQfRZbAmD-QLgPAcJ0YI2O2xFisY4uGmeyzkzeLLUie2Eh16sPgRrEvlaNp2gaDqoE6LruoLzlEgF3go+i+Yo9sWIygsyMUG4lLeMcGIZOKzsMa7O7u8R76MC+Qcg5Syzw2iosIiSMeHHEbm26qwXVSu3Nq5nTGPrWBf63203WG4CRmxiSZ4imCHigquYhCthbTv4tgZxlJ1ZYX035jCjW2JtqxK3Kck2I4rg28kiZJ5iGzz8dulZTr50Dcv8xqbOcqiVmqI73D8cKdO5JIg75-kHfNgmYHypokTY6xOa7wWOkWWRYgqbBRCcdYmMshAA */
    createMachine(
        {
            context: {
                todos: [] as string[],
                errorMessage: undefined as string | undefined,
                createNewTodoFormInput: '',
            },
            tsTypes: {} as import('./todoAppMachine.typegen').Typegen0,
            schema: {
                services: {} as {
                    loadTodos: {
                        data: string[];
                    };
                    saveTodo: {
                        data: void;
                    };
                    deleteTodo: {
                        data: void;
                    };
                },
                events: {} as
                    | { type: 'Create new' }
                    | { type: 'Form input changed'; value: string }
                    | { type: 'Submit' }
                    | { type: 'Delete'; todo: string }
                    | { type: 'Speed up' },
            },
            initial: 'Loading Todos',
            states: {
                'Loading Todos': {
                    invoke: {
                        src: 'loadTodos',
                        onDone: [
                            {
                                actions: 'assignTodosToContext',
                                cond: 'Has todos',
                                target: 'Todos Loaded',
                            },
                            {
                                target: 'Creating a new todo',
                            },
                        ],
                        onError: [
                            {
                                actions: 'assignErrorToContext',
                                target: 'Loading todos errored',
                            },
                        ],
                    },
                },
                'Todos Loaded': {
                    on: {
                        'Create new': {
                            target: 'Creating a new todo',
                        },
                        Delete: {
                            target: 'Deleting todo',
                        },
                    },
                },
                'Loading todos errored': {},
                'Creating a new todo': {
                    initial: 'Showing from input',
                    states: {
                        'Showing from input': {
                            on: {
                                'Form input changed': {
                                    actions: 'assignFormInputToContext',
                                },
                                Submit: {
                                    target: 'Saving todo',
                                },
                            },
                        },
                        'Saving todo': {
                            invoke: {
                                src: 'saveTodo',
                                onDone: [
                                    {
                                        target: '#Todo machine.Loading Todos',
                                    },
                                ],
                                onError: [
                                    {
                                        actions: 'assignErrorToContext',
                                        target: 'Showing from input',
                                    },
                                ],
                            },
                        },
                    },
                },
                'Deleting todo': {
                    invoke: {
                        src: 'deleteTodo',
                        onDone: [
                            {
                                target: 'Loading Todos',
                            },
                        ],
                        onError: [
                            {
                                actions: 'assignErrorToContext',
                                target: 'Deleting todo errored',
                            },
                        ],
                    },
                },
                'Deleting todo errored': {
                    after: {
                        '2000': {
                            target: 'Todos Loaded',
                        },
                    },
                    on: {
                        'Speed up': {
                            target: 'Todos Loaded',
                        },
                    },
                },
            },
            id: 'Todo machine',
        },
        {
            guards: {
                'Has todos': (context, event) => {
                    return event.data.length > 0;
                },
            },
            actions: {
                assignTodosToContext: assign((_context, event) => {
                    return {
                        todos: event.data,
                    };
                }),
                assignErrorToContext: assign((_context, event) => {
                    return {
                        errorMessage: (event.data as Error).message,
                    };
                }),
                assignFormInputToContext: assign((context, event) => {
                    return {
                        createNewTodoFormInput: event.value,
                    };
                }),
            },
        }
    );
