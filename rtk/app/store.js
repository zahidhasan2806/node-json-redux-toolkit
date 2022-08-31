const { configureStore } = require('@reduxjs/toolkit')
const { createLogger } = require("redux-logger");
const postReducer = require('../features/post/postSlice')
const relatedPostReducer = require('../features/relatedPosts/relatedPostSlice')

const logger = createLogger();

//configure store
const store = configureStore({
    reducer: {
        post: postReducer,
        relatedPost: relatedPostReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger)
});

module.exports = store;