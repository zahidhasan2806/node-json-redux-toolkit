const store = require('./rtk/app/store');
const { fetchPosts } = require('./rtk/features/post/postSlice')
//subscribe to state changes
store.subscribe(() => {

});

// dispatch actions
store.dispatch(fetchPosts());