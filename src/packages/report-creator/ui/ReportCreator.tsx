import { useMachine } from '@xstate/react';
import { todoMachine } from '../machines/todoAppMachine';
import { Greetings } from './Greetings/Greetings';

const todos = new Set<string>();

export const ReportCreator = (): JSX.Element => {
    // const [state, send] = useMachine(todoMachine, {
    //     services: {
    //         loadTodos: async () => {
    //             return Array.from(todos);
    //         },
    //         saveTodo: async (context, _event) => {
    //             todos.add(context.createNewTodoFormInput);
    //         },
    //         deleteTodo: async (context, event) => {
    //             // throw Error('Deleting failed');
    //             todos.delete(event.todo);
    //         },
    //     },
    // });

    return (
        <div>
            <h1>Report Creator</h1>

            {/* <pre>{JSON.stringify(state.value)}</pre>
            <pre>{JSON.stringify(state.context)}</pre>
            {state.matches('Deleting todo errored') && (
                <>
                    <p>Something went wrong: {state.context.errorMessage}</p>
                    <button
                        onClick={() => {
                            send({ type: 'Speed up' });
                        }}
                    >
                        Go back
                    </button>
                </>
            )} */}

            {/* {state.matches('Todos Loaded') && (
                <>
                    <h5>Loaded</h5>
                    <ul>
                        {state.context.todos.map((v, i) => (
                            <li key={i}>
                                {v}
                                <button
                                    onClick={() => {
                                        send({
                                            type: 'Delete',
                                            todo: v,
                                        });
                                    }}
                                >
                                    Del
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => {
                            send({ type: 'Create new' });
                        }}
                    >
                        Create a new
                    </button>
                </>
            )}
            {state.matches('Creating a new todo.Showing from input') && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        send({
                            type: 'Submit',
                        });
                    }}
                >
                    <input
                        onChange={(e) => {
                            send({
                                type: 'Form input changed',
                                value: e.target.value,
                            });
                        }}
                    />
                    <button type="submit">Save</button>
                </form>
            )} */}
            <Greetings />
        </div>
    );
};
