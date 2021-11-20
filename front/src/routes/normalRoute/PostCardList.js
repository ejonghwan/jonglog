import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { POSTS_LOADING_REQUEST } from '../../redux/types';
import { Helmet } from 'react-helmet'

import LoadingBar from  '../../components/loadingBar/LoadingBar.js'
import Post from '../../components/posts/Post.js'

const PostCardList = () => {

    const { posts } = useSelector(state => state.posts)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: POSTS_LOADING_REQUEST,
        })
    }, [dispatch])

    return (
        <Fragment>
            <Helmet title="home"></Helmet>
            { posts ? <Post posts={posts}/> : <LoadingBar /> }
        </Fragment>
    )
}


export default PostCardList;