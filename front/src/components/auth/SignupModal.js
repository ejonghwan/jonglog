import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { CLEAR_ERROR_REQUEST, SIGNUP_REQUEST } from '../../redux/types';


const SignupModal = () => {

    const [modal, setModal] = useState(false)
    const [form, setValue] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [localMsg, setLocalMsg] = useState('');

    const { errorMsg } = useSelector(state => state.user)

    const dispatch = useDispatch()

    const handleToggle = e => {
        dispatch({
            type: CLEAR_ERROR_REQUEST,
        })
        setModal(!modal)
    }

    useEffect(() => {
        try {
            setLocalMsg(errorMsg)
        } catch(err) {
            console.log(err)
        }
    }, [errorMsg])


    const handleChange = e => {
        e.preventDfault();
        setValue({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const { name, email, password } = form;
        const newUser = { name, email, password };

        console.log(newUser, "modal newUser");

        dispatch({
            type: SIGNUP_REQUEST,
            data: newUser,
        })
    }

    return (
        <Fragment>
            <button onClick={handleToggle}>signup</button>
            {modal && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">name</label>
                        <input id="name" name="name" type="text" onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="email">email</label>
                        <input id="email" name="email" type="text" onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="password">password</label>
                        <input id="password" name="password" type="text" onChange={handleChange}/>
                    </div>
                    <button type="submit">signup</button>
                </form>
            )}
        </Fragment>
    )
}


export default SignupModal;