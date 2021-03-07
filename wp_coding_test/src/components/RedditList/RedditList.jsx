import React, {
    useState,
    useEffect,
} from 'react';

import { fetchSubredditPosts } from '../../services';

import RedditPost from '../RedditPost';
import DebouncedInput from '../DebouncedInput';

import {
    postsPerPage,
    defaultReddit,
} from '../constants';

import './styles.scss';

const RedditList = () => {
    const [ page, setPage ] = useState(0);
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        onChangeInputHandler(defaultReddit);
    }, []);

    const onChangeInputHandler = async (subReddit) => {
        const posts = await fetchSubredditPosts(subReddit);
        setPosts(posts);
        setPage(0);
    }

    const firstPaginatedElement = (postsPerPage * page);
    const lastPaginatedElement = (postsPerPage * page) + postsPerPage;
    const maxPage = Math.floor(posts.length / postsPerPage);

    return (
        <>
            <header
                className="reddit-list_header"
            >
                <DebouncedInput
                    onChangeHandler={onChangeInputHandler}
                />
                <div>
                    <button
                        className={`reddit-list_header-button ${page === 0 ? 'disabled' : ''}`}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </button>
                    <span
                        className="reddit-list_header-page"
                    >
                        Page {page + 1} out of {maxPage + 1}
                    </span>
                    <button
                        className={`reddit-list_header-button ${page === maxPage ? 'disabled' : ''}`}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                </div>
            </header>
            <div
                className="reddit-list_posts"
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
