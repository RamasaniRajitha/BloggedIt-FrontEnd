import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, START_LOADING, END_LOADING, DELETE, COMMENT } from '../constants/actionTypes';
import * as api from '../api/index.js';

// Action Creators
export const getBlogs = (page) => async (dispatch) => { 
    try {
        dispatch({ type: START_LOADING }); // dispatch the loading action to the reducer
        const { data } = await api.fetchBlogs(page); // fetch the blogs from the backend
        // console.log(data);
        dispatch({ type: FETCH_ALL, payload: data }); // dispatch the action to the reducer
        dispatch({ type: END_LOADING }); // dispatch the end loading action to the reducer
    } catch (error) {
        console.log(error.message);
    }
}

export const getBlog = (id) => async (dispatch) => { 
    try {
        dispatch({ type: START_LOADING }); // dispatch the loading action to the reducer
        const { data } = await api.fetchBlog(id); // fetch the blogs from the backend
        // console.log(data);
        dispatch({ type: FETCH_POST, payload: data }); // dispatch the action to the reducer
        dispatch({ type: END_LOADING }); // dispatch the end loading action to the reducer
    } catch (error) {
        console.log(error.message);
    }
}

export const getBlogBySearch = (searchQuery) => async (dispatch) => {
    try{
        dispatch({ type: START_LOADING }); // dispatch the loading action to the reducer
        const { data: { data } } = await api.fetchBlogsBySearch(searchQuery); // fetch the blogs from the backend
        // console.log(data);
        dispatch({ type: FETCH_BY_SEARCH, payload: data }); // dispatch the action to the reducer
        dispatch({ type: END_LOADING }); // dispatch the end loading action to the reducer
    } catch (error) {
        console.log(error);
    }
}

export const createBlog = (blog) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING }); // dispatch the loading action to the reducer
        const { data } = await api.createBlog(blog); // create the blog in the backend
        dispatch({ type: CREATE, payload: data }); // dispatch the action to the reducer
        dispatch({ type: END_LOADING }); // dispatch the end loading action to the reducer
    } catch (error) {
        console.log(error.message);
    }
}

export const updateBlog = (id, blog) => async (dispatch) => {
    try {
        
        const { data } = await api.updateBlog(id, blog); // update the blog in the backend
        dispatch({ type: UPDATE, payload: data }); // dispatch the action to the reducer
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteBlog = (id) => async (dispatch) => {
    try {
        await api.deleteBlog(id); // delete the blog in the backend
        dispatch({ type: DELETE, payload: id }); // dispatch the action to the reducer
    } catch (error) {
        console.log(error.message);
    }
}

export const likeBlog = (id) => async (dispatch) => {
    try {
        const { data } = await api.likeBlog(id); // like the blog in the backend
        dispatch({ type: UPDATE, payload: data }); // dispatch the action to the reducer
    } catch (error) {
        console.log(error.message);
    }
}

export const commentBlog = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.commentBlog(value, id); // comment the blog in the backend
        dispatch({ type: COMMENT, payload: data }); // dispatch the action to the reducer
        return data.comments;
    } catch (error) {
        console.log(error);
    }
}