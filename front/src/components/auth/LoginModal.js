import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from '../../redux/types';


//components
import Button from '../../components/common/button/Button.js'


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
        if(!modal) {
            document.body.classList.add('dimd')
        } else {
            document.body.classList.remove('dimd')
        }
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
            <button className="line_r_t1" onClick={handleToggle}>로그인</button>
            {modal && (
                <article className="pop_t1">
                        <div className="pop_head">
                            <h2>로그인</h2>
                            <p className="line_l_t1">로그인 해주세요~</p>
                        </div>
                        
                        <div className="pop_body">
                            <div className="form_t1">
                                <form onSubmit={handleSubmit}>
                                    <div className="item">
                                        <label htmlFor="email">이메일</label>
                                        <input id="email" type="email" name="email" onChange={handleChange} />
                                    </div>
                                    <div className="item">
                                        <label htmlFor="password">비밀번호</label>
                                        <input id="password" type="password" name="password" onChange={handleChange} />
                                    </div>
                                    <Button type="submit" onClick={handleToggle} value={"로그인"} classN={"btn_point_t2 gapt_20"}/> <br />
                                </form>
                            </div>
                        </div>
                        <button onClick={handleToggle} className="pop_close">닫기</button>
                  
                </article>
            )}
            
        </Fragment>
    )
}

export default LoginModal;