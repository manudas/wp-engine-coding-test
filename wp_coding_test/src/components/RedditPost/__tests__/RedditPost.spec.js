import React from 'react';
import {
    render,
} from '@testing-library/react';
import RedditPost from '..';

describe('RedditPost test suite', () => {

    let renderer;

    beforeEach(() => {
        renderer = render(
            <RedditPost
                title = {'Title of faked post'}
                thumbnail = {'Wrong url for a thumbnail'}
                text = {'Post text'}
                url = {'//www.reddit.com/r/reactjs/comments/lvco7l/whos_hiring_march_2021/'}
            />
        );
    });

    it('should render <RedditPost />', () => {
        const { container } = renderer;
        expect(container).toMatchSnapshot();
    });

    it('check if components inside faked post exist', async () => {
        const {
            getByTestId,
            getByText,
            queryByTestId,
        } = renderer;

        const postTitle = getByTestId('postTitle');
        const postImg = queryByTestId('postImg');
        const postText = getByTestId('postText');
        const postLink = getByText(/go to post/i);

        expect(postTitle.textContent).toBe('Title of faked post');
        expect(postImg).not.toBeInTheDocument();
        expect(postText.textContent).toBe('Post text');
        expect(postLink.href).toMatch('//www.reddit.com/r/reactjs/comments/lvco7l/whos_hiring_march_2021/');
    });
});