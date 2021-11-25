import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { COMMENT_UPLOADING_REQUEST } from '../../redux/types';

const Comments = ({ postId, userId, userName }) => {

    const dispatch = useDispatch()
    const [form, setValues] = useState({ contents: '' })

    const handleChange = e => {
        e.preventDefault();
        console.log(form)
        setValues({
            ...form,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const { contents } = form;
        const token = localStorage.getItem('token');
        const body = {
            contents,
            token,
            postId,
            userId,
            userName,
        }

        dispatch({
            type: COMMENT_UPLOADING_REQUEST,
            data: body,
        })

    }


    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>content</label>
                    <input name="contents" onChange={handleChange}></input>
                    <button type="submit">comment</button>
                </div>
            </form>
        </Fragment>
    )
}


export default Comments;