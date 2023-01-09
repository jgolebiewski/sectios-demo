import { render, screen, renderHook } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { CountrySelector } from './CountrySelector';
import { getBaseUrl } from '../../../core/HttpClient';

type HandlerParams = Parameters<typeof setupServer>;
const setupMockServer = (...handlers: HandlerParams) => {
    const server = setupServer(...handlers);

    beforeAll(() =>
        server.listen({
            onUnhandledRequest: 'warn',
        })
    );
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    return server;
};

const handler = (spy: jest.Mock) => [
    rest.get(getBaseUrl() + 'api/countries', async (req, res, ctx) => {
        spy(req);
        return res(ctx.json([]));
    }),
];

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const { result } = renderHook(() => useForm());
const spy = jest.fn();
// const { control } = useForm();
describe('Country selector test', () => {
    setupMockServer(...handler(spy));

    it('should render component', async () => {
        render(<CountrySelector name="countries" control={result.current.control} label="Country" />);
        await screen.findByText('Country');
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
