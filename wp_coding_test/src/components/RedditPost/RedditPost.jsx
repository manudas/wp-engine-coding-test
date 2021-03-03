import React from 'react';

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
                className="reddit-post_title"
            >
                {title}
            </h2>
            <hr 
                className="reddit-post_separator"
            />
            <div
                className="reddit-post_content"
            >
                {
                    isUrl(thumbnail)
                        ? <img
                            className="reddit-post_img"
                            src={thumbnail}
                            alt={title}
                        />
                        : null
                }
                <p
                    className="reddit-post_text"
                >
                    {text}
                </p>
            </div>
            <a
                className="reddit-post_link"
                href={url}
                target="_blank"
                rel="noreferrer"
            >
                Go to post
            </a>
        </section>
    )
};

export default RedditPost;
