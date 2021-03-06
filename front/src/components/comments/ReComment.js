import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RECOMMENT_UPLOAD_REQUEST, POST_DETAIL_LOADING_REQUEST, COMMENT_LOADING_REQUEST, USER_LOAD_REQUEST } from '../../redux/types';



const Recomment = ({ commentsList, recommentToggle }) => {

    // console.log('asdasdasd', req)

    const [form, setValues] = useState({ contents: ''})
    const { userName, userId } = useSelector(state => state.user)
    const dispatch = useDispatch();

    

    const handleSubmit = async e => {
        
        e.preventDefault();
        await dispatch({
            type: RECOMMENT_UPLOAD_REQUEST,
            data: { userName: userName, contents: form.contents, commentId: commentsList._id, userId: userId, postId: commentsList.post},
        })
        recommentToggle(false) // toggle bool state 코멘트 페이지에 있음 props로 내려줌

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
                    <input type="text" onChange={handleChange} name="contents" required />
                </div>
                <button type="submit">완료</button>
            </form>
        </Fragment>
    )
}


export default Recomment;