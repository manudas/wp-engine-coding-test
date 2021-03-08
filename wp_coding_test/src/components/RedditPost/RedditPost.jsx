import React from 'react';

import PropTypes from 'prop-types';

import {
    isUrl,
} from '../../utils';

import './styles.scss';

const RedditPost = ({
    title,
    thumbnail,
    text,
    url,
}) => {

    return (
        <section
            className="reddit-post"
        >
            <h2
                data-testid="postTitle"
                className="reddit-post__title"
            >
                {title}
            </h2>
            <div
                className="reddit-post__separator"
            />
            <div
                className="reddit-post__content"
            >
                {
                    // we don't render an image
                    // if no thumbnail url has been passed
                    isUrl(thumbnail)
                        ? <img
                            data-testid="postImg"
                            className="reddit-post__img"
                            src={thumbnail}
                            alt={title}
                        />
                        : null
                }
                <p
                    data-testid="postText"
                    className="reddit-post__text"
                >
                    {text}
                </p>
            </div>
            <a
                className="reddit-post__link"
                href={url}
                target="_blank"
                rel="noreferrer"
            >
                Go to post
            </a>
        </section>
    )
};

RedditPost.propTypes = {
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    text: PropTypes.string,
    url: PropTypes.string.isRequired,
}

RedditPost.defaultProps = {
    title: null,
    thumbnail: null,
    text: null,
}

export default RedditPost;
