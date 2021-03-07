import {
    fetchSubredditPosts,
    endpoint,
} from '..';

import {
    notFoundResponse,
    noDataResponse,
    goodDataResponse,
    decodedGoodData,
} from '../../__data__';

describe('Test suite for Services', () => {

    const notFoundSubreddit = 'not a real reddit';
    const noDataSubreddit = 'notarealredditurl';
    const goodSubreddit = 'reactjs';

    beforeAll(() => jest.spyOn(window, 'fetch'));

    afterEach(() => jest.clearAllMocks());

    it('check if fetch was called', async () => {

        window.fetch.mockResolvedValueOnce(notFoundResponse);
        await fetchSubredditPosts(notFoundSubreddit);

        // was our window.fetch spied func called with the
        // correct endpoint file argument?
        expect(window.fetch).toHaveBeenCalledWith(
            encodeURI(`${endpoint}${notFoundSubreddit}.json`)
        );
        // was our spied func called once?
        expect(window.fetch).toHaveBeenCalledTimes(1);
    });

    it('invalid reddit url: 404 not found', async () => {

        window.fetch.mockResolvedValueOnce(notFoundResponse);
        const data = await fetchSubredditPosts(notFoundSubreddit);

        // check if the endpoint expected to be hit is correct
        expect(window.fetch).toHaveBeenCalledWith(
            encodeURI(`${endpoint}${notFoundSubreddit}.json`)
        );

        expect(data.length).toBe(0);

        // have we hit the endpoint? it may be redundant
        // given previous toHaveBeenCalledWith
        expect(window.fetch).toHaveBeenCalledTimes(1);
    });

    it('invalid reddit url: no data', async () => {

        window.fetch.mockResolvedValueOnce(noDataResponse);
        const data = await fetchSubredditPosts(noDataSubreddit);

        // check if the endpoint expected to be hit is correct
        expect(window.fetch).toHaveBeenCalledWith(
            encodeURI(`${endpoint}${noDataSubreddit}.json`)
        );

        expect(data.length).toBe(0);

        // this might be redundant
        expect(window.fetch).toHaveBeenCalledTimes(1);
    });

    it('good reddit url', async () => {

        // we'll have a good response with data here
        window.fetch.mockResolvedValueOnce(goodDataResponse);
        const data = await fetchSubredditPosts(goodSubreddit);

        expect(window.fetch).toHaveBeenCalledWith(
            encodeURI(`${endpoint}${goodSubreddit}.json`)
        );

        // 27 posts returned from the API endpoint call
        expect(data.length).toBe(27);

        // is the decoded data as expected?
        expect(data).toEqual(data, decodedGoodData);

        expect(window.fetch).toHaveBeenCalledTimes(1);
    });

    it('good reddit url data has been sorted by timedate', async () => {

        window.fetch.mockResolvedValueOnce(goodDataResponse);
        const data = await fetchSubredditPosts(goodSubreddit);

        let previous_post_creation_time =  data[0].created_utc;
        for (let i = 1; i < data.length; i++) {
            // we check that every creation time
            // of every post is smaller that next
            // creation time post. So it's order
            // in ascending order
            expect(data[i].created_utc > previous_post_creation_time).toBeTruthy();
            previous_post_creation_time = data[i].created_utc;
        }
    });
});
