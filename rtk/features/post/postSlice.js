const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const fetch = require('node-fetch');

//initial State
const initialState = {
    loading: false,
    post: {},
    error: "",
};

//create async thunk
const fetchPost = createAsyncThunk('post/fetchPost', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/28');

    const post = await response.json();

    return post;
})



// create slice
const postSlice = createSlice({
    name: "post",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPost.pending, (state, action) => {
            state.loading = true;
            state.error = '';
        });

        builder.addCase(fetchPost.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.post = action.payload
        })
        builder.addCase(fetchPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.posts = {}
        })
    }
});

module.exports = postSlice.reducer;
module.exports.fetchPost = fetchPost;