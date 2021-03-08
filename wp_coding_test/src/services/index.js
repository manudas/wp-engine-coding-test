import {
    endpoint,
} from '../components/constants';

const getPostsFromPayload = ({
    data: {
        children: postsList
    }
}) => {

    return postsList.map(({data}) => data).sort((a, b) => Number(a.created_utc) - Number(b.created_utc));
};

export const fetchSubredditPosts = async (subreddit) => {

    const url = `${endpoint}${subreddit}.json`;
    try {
        const response = await fetch(encodeURI(url));
        if (response.ok) {
            const payload = await response.json();
            const posts = getPostsFromPayload(payload);
            return posts;
        }
    } catch(err) {
        // external is _not_ reachable
        console.error('Network error, url not reachable');
    };

    return [];
};