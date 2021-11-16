import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from '../../redux/types';


const LoginModal = () => {

    const [modal, setModal] = useState(false);
    const [localMsg, setLocalMsg] = useState('');
    const [form, setValues] = useState({
        email: "",
        password: "",
    })


    const dispatch = useDispatch()
    const { errorMsg } = useSelector(state => state.user)


    useEffect(() => {
        try {
            setLocalMsg(errorMsg)
        } catch(err) {
            console.log(err)
        }
    }, [errorMsg])


    const handleToggle = () => {
        dispatch({
            type: CLEAR_ERROR_REQUEST
        })
        setModal(!modal);
    }

    const handleChange = (e) => {
        setValues({
            ...form, 
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const { email, password } = form;
        const user = { email, password }
        console.log(user)

        dispatch({
            type: LOGIN_REQUEST,
            data: user,
        })
    }

    return (
        <Fragment>
            <button onClick={handleToggle}>modal</button>
            {modal && (
                <div>
                    <div>modal header</div>
                    <div>modal body
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email">email</label>
                                <input id="email" type="email" name="email" onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="password">password</label>
                                <input id="password" type="password" name="password" onChange={handleChange} />
                            </div>
                            <button type="submit">login</button>
                        </form>
                    </div>
                </div>
            )}
            
        </Fragment>
    )
}

export default LoginModal;