
import {
    render,
    waitFor,
    fireEvent,
} from '@testing-library/react';
import RedditList from '..';

import * as services from '../../../services'
import {
    goodDataResponse,
} from '../../../__data__';

describe(('Test suite for RedditList component'), () => {
    let renderer;

    it('should render an empty List and hit the API', async () => {
        jest.spyOn(services, 'fetchSubredditPosts').mockImplementation(() => []);

        renderer = render(<RedditList />);
        const { container } = renderer;
        expect(container).toMatchSnapshot();

        // wait for effects to have been run
        await waitFor(() => expect(services.fetchSubredditPosts).toHaveBeenCalledTimes(1));
        expect(services.fetchSubredditPosts).toHaveBeenCalledWith('reactjs');

        const expected = expect.arrayContaining([]);
        expect(services.fetchSubredditPosts).toEqual(expected);
    });

    it('should render a maximum of 10 post at at time', async () => {
        /*
         * Rather than mocking the service, we'll mock here
         * the call to window.fech. This way we'll have our
         * services run, so we are runing more of a kind of
         * a integration test here
         */
        jest.spyOn(window, 'fetch')
        window.fetch.mockResolvedValueOnce(goodDataResponse);

        renderer = render(<RedditList />);
        const { getAllByText } = renderer;

        // wait for effects to have been run
        // there's one link redirecting to the
        // post by subredit post drawn on screen
        expect((await waitFor(() => getAllByText(/go to post/i))).length).toBe(10);
    });

    it('should allow pagination when available', async () => {
        /*
         * We'll mock global fetch here too
         */
        jest.spyOn(window, 'fetch')
        window.fetch.mockResolvedValueOnce(goodDataResponse);

        renderer = render(<RedditList />);
        const {
            getAllByText,
            getByText,
        } = renderer;

        const previousButton = getByText(/previous/i);
        const nextButton = getByText(/next/i);

        // wait for effects to have been run
        // before checking the state of the buttons
        let goToPostLinks, nextPagePostLinks;
        await waitFor(() => goToPostLinks = nextPagePostLinks = getAllByText(/go to post/i));

        // first page: previous button should be disabled, next shouldn't
        expect(previousButton).toHaveClass('disabled');
        expect(nextButton).not.toHaveClass('disabled');

        fireEvent.click(nextButton); // page 2
        await waitFor(() => {
            // expect(goToPostLinks).not.toEqual(nextPagePostLinks); // testing expectation
            nextPagePostLinks = getAllByText(/go to post/i);
            expect(goToPostLinks).not.toEqual(nextPagePostLinks);
        });

        goToPostLinks = nextPagePostLinks;
        fireEvent.click(nextButton); // third page
        await waitFor(() => {
            nextPagePostLinks = getAllByText(/go to post/i);
            expect(goToPostLinks).not.toEqual(nextPagePostLinks);
        });

        /*
         * In our mocking data set we have
         * 27 posts. Being in the 3th page
         * we can only have 7 elements left
         * on the screen at this moment
         */
        expect(nextPagePostLinks.length).toBe(7);

        // last page: previous button should not be disabled, next should
        expect(previousButton).not.toHaveClass('disabled');
        expect(nextButton).toHaveClass('disabled');
    });

    afterEach(() => {
        jest.restoreAllMocks(); // clears mocked implementations
        jest.clearAllMocks();
    });
});
