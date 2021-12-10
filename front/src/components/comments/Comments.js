import React, { useState, Fragment, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { COMMENT_UPLOADING_REQUEST } from '../../redux/types';


// components
import Recomment from './ReComment.js'


const Comments = ({ postId, userId, userName }) => {

    const dispatch = useDispatch()
    const [form, setValues] = useState({ contents: '' })


    // console.log(form)

    const handleChange = e => {
        e.preventDefault();
        // console.log(form)
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

        resetValue.current.value = ''
        setValues({ contents: '' })

    }

    const resetValue = useRef(null)
    // useEffect(() => {
    //     console.log(resetValue)
    // }, [])


    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>content</label>
                    <textarea name="contents" resize="none" onChange={handleChange} ref={resetValue}></textarea>
                    <button type="submit">comment</button>
                </div>
            </form>
            <form>
                
            </form>
            
        </Fragment>
    )
}


export default Comments;