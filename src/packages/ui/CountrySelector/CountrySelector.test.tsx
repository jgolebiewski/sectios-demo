import { render, renderHook, screen, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { CountrySelector } from './CountrySelector';
import { getBaseUrl } from '../../../core/HttpClient';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useCountries } from '../../../core/hooks/useCountries';
import { JSX } from 'react';

type HandlerParams = Parameters<typeof setupServer>;
const setupMockServer = (...handlers: HandlerParams) => {
    const server = setupServer(...handlers);

    beforeAll(() =>
        server.listen({
            onUnhandledRequest: 'warn',
        }),
    );
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    return server;
};

const handler = (spy: jest.Mock) => [
    http.get(getBaseUrl() + 'api/countries', async ({ request }) => {
        spy(request);
        return HttpResponse.json([]);
    }),
];

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const { result } = renderHook(() => useForm());
const spy = jest.fn();

describe('Country selector test', () => {
    setupMockServer(...handler(spy));

    const queryClient = new QueryClient();

    const wrapper = ({ children }: { children: JSX.Element }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    it('should render component', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <CountrySelector name="countries" control={result.current.control} label="Country" />
            </QueryClientProvider>,
        );
        await screen.findByText('Country');
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should load countries from custom hook', async () => {
        const { result: data } = renderHook(() => useCountries(), {
            wrapper,
        });

        await waitFor(() => data.current.isSuccess);

        expect(data.current.options).toBeDefined();
    });
});
