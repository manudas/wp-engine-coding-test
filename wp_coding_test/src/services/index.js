import {
    endpoint,
} from '../components/constants';

/**
 * Auxiliar function to cherrypick the data of
 * our interest from all those returned by the API
 *
 * @param {object} param0 the object containing the
 * data from the API Call
 *
 * @return {array} a sorted array of posts
 */
const getPostsFromPayload = ({
    data: {
        children: postsList
    }
}) => {

    return postsList.map(({data}) => data).sort((a, b) => Number(a.created_utc) - Number(b.created_utc));
};

/**
 * Hit the API and fetch the data of the subreddit
 * @param {string} subreddit
 *
 * @return {array} a set of post ordered by creation time
 */
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