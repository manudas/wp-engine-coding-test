import React, {
    useState,
    useEffect,
} from 'react';

import { fetchSubredditPosts } from '../../services';

import RedditPost from '../RedditPost';
import DebouncedInput from '../DebouncedInput';
import Paginator from '../Paginator';

import {
    postsPerPage,
    defaultReddit,
} from '../constants';

import './styles.scss';

const RedditList = () => {
    const [ page, setPage ] = useState(0);
    const [ posts, setPosts ] = useState( [] );

    useEffect(() => {
        // calls API when component is
        // mounted for the first time
        onChangeInputHandler(defaultReddit);
    }, []);

    /**
     * This is the external handler to be passed
     * down to DebouncedInput, so it can run this
     * code once passed the configured debounced time
     *
     * @param {string} subReddit the subreddit
     * which we are going to fetch the data for
     *
     */
    const onChangeInputHandler = async (subReddit) => {
        const posts = await fetchSubredditPosts(subReddit);
        setPosts(posts);
        setPage(0);
    };

    const firstPaginatedElement = postsPerPage * page;
    const lastPaginatedElement = firstPaginatedElement + postsPerPage;
    const maxPage = Math.floor(posts.length / postsPerPage);

    return (
        <>
            <header
                className="reddit-list__header"
            >
                <DebouncedInput
                    onChangeHandler={onChangeInputHandler}
                />
                <Paginator
                    page={page}
                    setPage={setPage}
                    maxPage={maxPage}
                />
            </header>
            <div
                className="reddit-list__posts"
            >
                {
                    posts.slice(firstPaginatedElement, lastPaginatedElement).map(({
                        title,
                        thumbnail,
                        selftext,
                        id,
                        url,
                    }) =>
                        <RedditPost
                            key={id}
                            title={title}
                            thumbnail={thumbnail}
                            text={selftext}
                            url={url}
                        />
                    )
                }
            </div>
        </>
    );
};

export default RedditList;
