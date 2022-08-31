const store = require('./rtk/app/store');
const { fetchPost } = require('./rtk/features/post/postSlice');
const { fetchRelatedPosts } = require('./rtk/features/relatedPosts/relatedPostSlice');
//subscribe to state changes
store.subscribe(() => {

});
// create initial dispatch function
const dispatchInit = async () => {
    const postFetch = await store.dispatch(fetchPost());
    if (postFetch) {
        store.dispatch(fetchRelatedPosts(postFetch));
    };
};

// call initial dispatch function
dispatchInit();