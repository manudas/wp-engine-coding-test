const endpoint = '//www.reddit.com/r/';

const getPostFromPayload = (payload) => {
    const { children: postsList } = payload.data;

    return postsList.map(post => {
        console.log('order by datetime');
        return post.data
    });
};

export const fetchSubredditPosts = async (subreddit) => {
    const url = `${endpoint}${subreddit}.json`;
    const response = await fetch(url);
    if (response.ok) {
        const payload = await response.json();
        return getPostFromPayload(payload);
    }
    return [];
};