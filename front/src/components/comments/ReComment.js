import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RECOMMENT_UPLOAD_REQUEST, POST_DETAIL_LOADING_REQUEST, COMMENT_LOADING_REQUEST, USER_LOAD_REQUEST } from '../../redux/types';



const Recomment = ({ comments }) => {

    // console.log('asdasdasd', req)

    const [form, setValues] = useState({ contents: ''})
    const { userName, userId } = useSelector(state => state.user)
    const dispatch = useDispatch();

    

    const handleSubmit = async e => {
        
        e.preventDefault();
        await dispatch({
            type: RECOMMENT_UPLOAD_REQUEST,
            data: { userName: userName, contents: form.contents, commentId: comments._id, userId: userId, postId: comments.post},
        })


        // 얘가 될때있고 안될때 있음 확인해야됨 그리고 왜 세개가 있어야 리다이렉트 되는건지도 ...
        await dispatch({
            type: POST_DETAIL_LOADING_REQUEST,
            // data: params.id,
            data: comments.post,
        })
        await dispatch({
            type: USER_LOAD_REQUEST,
            data: localStorage.getItem('token'),
        })
        await dispatch({
            type: COMMENT_LOADING_REQUEST,
            // data: params.id,
            data: comments.post,
        })

        console.log({ userName: userName, contents: form.contents, commentId: comments._id})
    }

    const handleChange = e => {
        e.preventDefault();
        setValues({
            ...form,
            [e.target.name]: e.target.value
        })                   

        // console.log(form)
    }

    // console.log( '대댓글 폼페이지',  comments)

    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" onChange={handleChange} name="contents" required/>
                </div>
                <button type="submit">완료</button>
            </form>
        </Fragment>
    )
}


export default Recomment;