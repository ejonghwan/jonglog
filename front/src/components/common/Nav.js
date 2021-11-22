import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
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
                    <Link to="/post" onClick={addPostClick}>add post</Link>
                    <Routes>
                        <Route path="/posts" component={SignupModal} />
                    </Routes>
                </Fragment>
            ) : (
                <Fragment>
                    {user && user.name ? (
                        <Fragment>
                            {user ? `welcom ${user.name }` : ""}
                        </Fragment>
                    ) : (
                        <button>
                            no user
                        </button>
                    )}
                </Fragment>
                
            )}
            <button onClick={logout}>logout</button>
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
            <nav>
                <ul>
                    <li>
                        {/* <Link to="/">jonglog</Link> */}
                        <a href="/">jonglog</a>
                    </li>
                     {user ? authLink : guestLink}
                
                </ul>
            </nav>
        </Fragment>
    )
}

export default Nav