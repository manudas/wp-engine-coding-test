import isEqual from 'lodash/isEqual';

import {
    fetchSubredditPosts,
    endpoint,
} from '..';

import {
    notFoundResponse,
    noDataResponse,
    goodDataResponse,
    decodedGoodData,
} from '../__mocks__/index.mocks';

describe('Test suite for Services', () => {

    const notFoundSubreddit = 'not a real reddit';
    const noDataSubreddit = 'notarealredditurl';
    const goodSubreddit = 'reactjs';

    beforeAll(() => jest.spyOn(window, 'fetch'));

    afterEach(() => jest.clearAllMocks());

    it('check if fetch was called', async () => {
        
        window.fetch.mockResolvedValueOnce(notFoundResponse);
        await fetchSubredditPosts(notFoundSubreddit);
               
        expect(window.fetch).toHaveBeenCalledWith(
            encodeURI(`${endpoint}${notFoundSubreddit}.json`)
        );
        
        expect(window.fetch).toHaveBeenCalledTimes(1);
    });

    it('invalid reddit url: 404 not found', async () => {
        
        window.fetch.mockResolvedValueOnce(notFoundResponse);
        const data = await fetchSubredditPosts(notFoundSubreddit);
               
        expect(window.fetch).toHaveBeenCalledWith(
            encodeURI(`${endpoint}${notFoundSubreddit}.json`)
        );

        expect(data.length).toBe(0);
        
        expect(window.fetch).toHaveBeenCalledTimes(1);
    });

    it('invalid reddit url: no data', async () => {
        
        window.fetch.mockResolvedValueOnce(noDataResponse);
        const data = await fetchSubredditPosts(noDataSubreddit);
               
        expect(window.fetch).toHaveBeenCalledWith(
            encodeURI(`${endpoint}${noDataSubreddit}.json`)
        );

        expect(data.length).toBe(0);
        
        expect(window.fetch).toHaveBeenCalledTimes(1);
    });

    it('good reddit url', async () => {
        
        window.fetch.mockResolvedValueOnce(goodDataResponse);
        const data = await fetchSubredditPosts(goodSubreddit);
               
        expect(window.fetch).toHaveBeenCalledWith(
            encodeURI(`${endpoint}${goodSubreddit}.json`)
        );

        expect(data.length).toBe(27);

        expect(isEqual(data, decodedGoodData)).toBe(true);
        
        expect(window.fetch).toHaveBeenCalledTimes(1);
    });

});