import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { CLEAR_ERROR_REQUEST, SIGNUP_REQUEST } from '../../redux/types';


//component
import Button from '../../components/common/button/Button.js'


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
                    <p className="line_l_t1">간단하게 회원가입 하세요~</p>
                </div>
                <div className="pop_body">
                        <div className="form_t1">
                            <form onSubmit={handleSubmit}>
                                <div className="item">
                                    <label htmlFor="email">이메일</label><br />
                                    <input id="email" name="email" type="text" onChange={handleChange}/>
                                </div>
                                <div className="item">
                                    <label htmlFor="name">닉네임</label><br />
                                    <input id="name" name="name" type="text" onChange={handleChange}/>
                                </div>
                                <div className="item">
                                    <label htmlFor="password">비밀번호</label><br />
                                    <input id="password" name="password" type="text" onChange={handleChange}/>
                                </div>
                                <Button value={"회원가입"} classN={"btn_point_t2 gapt_20"}/>
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