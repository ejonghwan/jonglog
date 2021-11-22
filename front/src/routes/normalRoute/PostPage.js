import React, { Fragment, useEffect,  } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {} from 'react-helmet'
import { Link, useParams, useLocation } from 'react-router-dom'
import { POST_DETAIL_LOADING_REQUEST, USER_LOAD_REQUEST, POST_DELETE_REQUEST } from '../../redux/types.js'
// import { CKEditor } from '@ckeditor/ckeditor5-react'
import CKEditor from '@ckeditor/ckeditor5-react'

const PostPage = (req) => {

    const params = useParams();
    const ma = useLocation()
    const dispatch = useDispatch();
    const { postDetail, creatorId, title, loading } = useSelector(state => state.posts)
    const { userId, userName } = useSelector(state => state.user)

    console.log(params.id)
    console.log(ma)

    useEffect(() => {
        dispatch({
            type: POST_DETAIL_LOADING_REQUEST,
            data: params.id
        })
        dispatch({
            type: USER_LOAD_REQUEST,
            data: localStorage.getItem('token'),
        })
    }, [])

    const handleDelete = e => {
        dispatch({
            type: POST_DELETE_REQUEST,
            data: {
                // id: req.match.params.id,
                token: localStorage.getItem('token')
            }
        })
    }

    const EditButton = (
        <Fragment>
            <Link to="/">home</Link>
            <Link to={`/post/${params.id}/edit`}>edit post</Link>
            <button>delete</button>
        </Fragment>
    )

    const HomeButton = (
        <Fragment>
            <Link to="/">home</Link>
            {/* <Link to={`/post/${req.match.params.id}/edit`}>edit post</Link> */}
            <button>delete</button>
        </Fragment>
    )

    return (
        <Fragment>
            ???? post page
        </Fragment>
    )
}


export default PostPage;