import React from 'react';

import {
    isUrl,
} from '../../utils';

import './styles.scss';

const RedditPost = ({
    title,
    thumbnail,
    text,
    text_html,
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
            {
                isUrl(thumbnail)
                    ? <img
                        src={thumbnail}
                        alt={title}
                    />
                    : null
            }
            <p>
                {text}
            </p>
        </section>
    )
};

export default RedditPost;
