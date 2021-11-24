import React, { Fragment, useEffect, useRef } from 'react';
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
    const { userId, userName, isAuthenticated } = useSelector(state => state.user)


    console.log(postDetail, creatorId, title, loading)
    // console.log(params.id)
    // console.log(ma)

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
                id: params.id,
                token: localStorage.getItem('token')
            }
        })
    }

    const EditButton = (
        <Fragment>
            <Link to="/">home</Link>
            <Link to={`/post/${params.id}/edit`}>edit post</Link>
            <button onClick={handleDelete}>delete</button>
        </Fragment>
    )

    const HomeButton = (
        <Fragment>
            관리자 권한아님
        </Fragment>
    )
    


    

    return (
        <Fragment>
            
            <div>
                { isAuthenticated ? EditButton : HomeButton }
                <br />
                <br />
                <br />
                <br />
                {postDetail && (
                    <Fragment>
                        <div className="aa"></div>
                        title: {postDetail.title}  <br />
                        contents: {postDetail.contents}  <br />
                        views: {postDetail.views}  <br />
                        date: {postDetail.date}  <br />
                        comments: {postDetail.comments}  <br />
                        name: {postDetail.creator.name}  <br />
                        category: {postDetail.category.categoryName}  <br />
                    </Fragment>
                )}



            </div>
        </Fragment>
    )
}


export default PostPage;