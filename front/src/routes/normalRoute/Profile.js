import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CLEAR_ERROR_REQUEST, PASSWORD_CHANGE_REQUEST } from '../../redux/types';
import Helmet from 'helmet'



const Profile = () => {

    // return (
    //     <div>
    //         asdasdassad
    //     </div>
    // )

    const { userId, errorMsg, successMsg, prevMsg } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const { userName } = useParams()
    const [form, setValues] = useState({ prevPassword: '', password: '', checkPassword: '', })
    
    const handleChange = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const { prevPassword, password, checkPassword } = form 
        const token = localStorage.getItem('token')

        dispatch({
            type: CLEAR_ERROR_REQUEST,
        })
        dispatch({
            type: PASSWORD_CHANGE_REQUEST,
            data: { prevPassword, password, checkPassword, token, userId, userName }
        })
    }

    return (
        <Fragment>
            <Helmet title={`Profile | ${userName}님의 프로필`}/>
            <h3>edit password</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="prevPassword">기존 비밀번호</label>
                    <input type="password" name="prevPassword" id="prevPassword" onChange={handleChange} />
                </div>
                {prevMsg ? alert({prevMsg}) : ''}

                <div>
                    <label htmlFor="password">새로운 비밀번호</label>
                    <input type="password" name="password" id="password" onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="checkPassword">새로운 비밀번호 체크</label>
                    <input type="password" name="checkPassword" id="checkPassword" onChange={handleChange} />
                </div>
                {errorMsg ? alert({errorMsg}) : ''}

                <button type="submit">패스워드 변경</button>

            </form>
        </Fragment>
    )
}


export default Profile;