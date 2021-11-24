import React, { Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {} from 'react-helmet'
import { Link, useParams, useLocation } from 'react-router-dom'
import { POST_DETAIL_LOADING_REQUEST, USER_LOAD_REQUEST, POST_DELETE_REQUEST } from '../../redux/types.js'
import { CKEditor } from '@ckeditor/ckeditor5-react'
// import CKEditor from '@ckeditor/ckeditor5-react' 아씨 절대 이렇게 쓰면 안됨 --
import BallonEditor from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor'
import { editorConfiguration } from '../../components/editor/Edit.js';
import Comments from '../../components/comments/Comments.js';

const PostPage = (req) => {

    const params = useParams();
    // const ma = useLocation()
    const dispatch = useDispatch();
    const { postDetail, creatorId, title, loading } = useSelector(state => state.posts)
    const { userId, userName, isAuthenticated } = useSelector(state => state.user)
    const { comments } = useSelector(state => state.comment)


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
                {postDetail && postDetail.comments ?  (
                    
                    <Fragment>
                        <span>date{postDetail.date}</span> &nbsp;
                        <span>length{postDetail.comments.length}</span> &nbsp;
                        <span>view{postDetail.views}</span> &nbsp;
                        <CKEditor 
                            editor={BallonEditor}
                            data={postDetail.contents}
                            config={editorConfiguration}
                            disabled="true"
                        />
                        <hr />
                        <p>!!comment</p>
                        <div>
                            {Array.isArray(comments) ? comments.map(({ contents, creator, date, _id, creatorName }) => {
                                <div key={_id}>
                                    <div>작성자: {creatorName ? creatorName : creator}</div>
                                    <div>시간: {date}</div>
                                    <div>내용: {contents}</div>
                                </div>
                            }) : (
                                <Fragment>
                                    creator
                                </Fragment>
                            ) }

                            
                            <Comments 
                                postId={params.id}
                                userId={userId}
                                userName={userName}
                            />
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        asdasd
                    </Fragment>
                )}



                {/* title: {postDetail.title}  <br />
                contents: {postDetail.contents}  <br />
                views: {postDetail.views}  <br />
                date: {postDetail.date}  <br />
                comments: {postDetail.comments}  <br />
                name: {postDetail.creator.name}  <br />
                category: {postDetail.category.categoryName}  <br /> */}


            </div>
        </Fragment>
    )
}


export default PostPage;