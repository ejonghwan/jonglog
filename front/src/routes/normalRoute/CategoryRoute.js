import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { CATEGORY_FIND_REQUEST } from '../../redux/types';

// components
import Post from '../../components/posts/Post.js'


const CategoryRoute = (req) => {

    const dispatch = useDispatch()
    const { categoryFindResult } = useSelector(state => state.posts)

    useEffect(() => {
        // console.log('???')
        dispatch({
            type: CATEGORY_FIND_REQUEST,
            data: req.match.params.categoryName
        })

        console.log(categoryFindResult, '???????asdasd')
    }, [])

    console.log(req.match)

    return (
        <Fragment>
            <Post posts={categoryFindResult.posts} />
        </Fragment>
    )
}


export default CategoryRoute;