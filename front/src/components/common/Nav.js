import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { LOGOUT_REQUEST } from '../../redux/types.js';

import LoginModal from '../auth/LoginModal.js'
import SignupModal from '../auth/SignupModal.js'




const Nav = () => {

    const [ isOpen, setIsOpen ] = useState(false);
    const { isAuthenticated, user, userRole, userId } = useSelector(state => state.user)

    // console.log(user, 'user')


    const dispatch = useDispatch()

    const logout = useCallback(() => {
        dispatch({
            type: LOGOUT_REQUEST,
        })
    }, [dispatch])

    // useEffect(() => {
    //     setIsOpen(false)
    // }, [])

    useEffect(() => {
        // console.log('asdkladlkqwjodqdq',userId)
    }, [userId])


    const addPostClick = e => {
        // console.log(11)
    }

    


    const authLink = (
        <Fragment>
            {userRole === "MainJuin" ? (
                <Fragment>
                    <span className="line_r_t1">
                        {user ? `안녕~ ${user.name }` : ""}
                    </span>
                    <span className="line_r_t1"> 
                        <Link to="/post" onClick={addPostClick}>글쓰기</Link>
                    </span>
                    
                    {/* <Routes> */}
                        <Route path="/posts" component={SignupModal} />
                    {/* </Routes> */}
                </Fragment>
            ) : (
                <Fragment>
                    {user && user.name ? (
                        <Fragment>
                            {user ? `안녕~ ${user.name }님` : ""}
                        </Fragment>
                    ) : (
                        <button>
                            no user
                        </button>
                    )}
                </Fragment>
                
            )}
            <button onClick={logout}>로그아웃</button>
        </Fragment>
    )

    const guestLink = (
        <Fragment>
            <LoginModal />
            <SignupModal />
        </Fragment>
    )

    
    return (
        <Fragment>
            
            <div className="auth_box">
                {user ? authLink : guestLink}
            </div>
           
            <nav>
                <ul className="nav_list">
                    <li>
                        <Link to="/">jonglog</Link>
                    </li>
                    <li>
                        <Link to="/">Profile</Link>
                    </li>
                    <li>
                        <Link to="/">HTML</Link>
                    </li>
                    <li>
                        <Link to="/">CSS</Link>
                    </li>
                    <li> 
                        <Link to="/">Javascript</Link>
                    </li>
                    <li>
                        <ul className="icon_box">
                            <li>검색</li>
                            <li>모모</li>
                            <li>블랙앤화이트</li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </Fragment>
    )
}

export default Nav