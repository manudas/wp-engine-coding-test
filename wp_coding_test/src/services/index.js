export const endpoint = '//www.reddit.com/r/';

const getPostFromPayload = (payload) => {
    const { children: postsList } = payload.data;

    return postsList.map(post => {
        return post.data
    }).sort((a, b) => Number(a.created_utc) - Number(b.created_utc));
};

export const fetchSubredditPosts = async (subreddit) => {

    const url = `${endpoint}${subreddit}.json`;
    const response = await fetch(encodeURI(url));
    if (response.ok) {
        const payload = await response.json();
        const posts = getPostFromPayload(payload);
        return posts;
    }
    return [];
};