const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const fetch = require('node-fetch');

//initial State
const initialState = {
    loading: false,
    posts: [],
    error: "",
};


//create async thunk
const fetchRelatedPosts = createAsyncThunk('relatedPost/fetchPosts', async (postData) => {
    const searchedWord = postData.payload.title.split(" ")
    let queryUrl = 'https://jsonplaceholder.typicode.com/posts?';
    for (let i = 0; i < searchedWord.length; i++) {
        queryUrl += `title_like=${searchedWord[i]}`
        if (i === searchedWord.length - 1) {
            break
        };
        queryUrl += "&"
    };
    const response = await fetch(queryUrl);

    const posts = response.json();

    return posts;
})


// create slice
const relatedPostSlice = createSlice({
    name: "relatedPosts",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchRelatedPosts.pending, (state, action) => {
            state.loading = true;
            state.error = '';
        })

        builder.addCase(fetchRelatedPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.posts = action.payload
        })
        builder.addCase(fetchRelatedPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.posts = []
        })
    }
});

module.exports = relatedPostSlice.reducer;
module.exports.fetchRelatedPosts = fetchRelatedPosts