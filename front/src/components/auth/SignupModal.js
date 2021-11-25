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

    const handleToggle = () => {
        dispatch({
            type: CLEAR_ERROR_REQUEST
        })
        if(!modal) {
            document.body.classList.add('dimd')
        } else {
            document.body.classList.remove('dimd')
        }
        setModal(!modal);

    }

    useEffect(() => {
        try {
            setLocalMsg(errorMsg)
        } catch(err) {
            console.log(err)
        }
    }, [errorMsg])


    const handleChange = e => {
        e.preventDefault();
        setValue({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const { name, email, password } = form;
        const newUser = { name, email, password };

        // console.log(newUser, "modal newUser");

        dispatch({
            type: SIGNUP_REQUEST,
            data: newUser,
        })
    }

    return (
        <Fragment>
            <button onClick={handleToggle}>회원가입</button>
            {modal && (
            <article className="pop_t1">
                <div className="pop_head">
                    <h2>회원가입</h2>
                    <p>modal body</p>
                </div>
                <div className="pop_body">
                        <div className="form_t1">
                            <form onSubmit={handleSubmit}>
                                <div className="item">
                                    <label htmlFor="email">email</label><br />
                                    <input id="email" name="email" type="text" onChange={handleChange}/>
                                </div>
                                <div className="item">
                                    <label htmlFor="name">name</label><br />
                                    <input id="name" name="name" type="text" onChange={handleChange}/>
                                </div>
                                <div className="item">
                                    <label htmlFor="password">password</label><br />
                                    <input id="password" name="password" type="text" onChange={handleChange}/>
                                </div>
                                <button type="submit">signup</button>
                            </form>
                        </div>
                    
                    </div>
                    <button onClick={handleToggle} className="pop_close">닫기</button>
            </article>
            )}
            
        </Fragment>
    )
}


export default SignupModal;