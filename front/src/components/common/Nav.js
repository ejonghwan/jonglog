import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { LOGOUT_REQUEST } from '../../redux/types.js';

import LoginModal from '../auth/LoginModal.js'
import SignupModal from '../auth/SignupModal.js'




const Nav = () => {

    const [ isOpen, setIsOpen ] = useState(false);
    const { isAuthenticated, user, userRole, userId } = useSelector(state => state.user)

    console.log(user, 'user')


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
        console.log('asdkladlkqwjodqdq',userId)
    }, [userId])


    const authLink = (
        <Fragment>
            {userRole === "mainJuin" ? (
                <form>
                    <a href="/posts" onClick={addPostClick}>add post</a>
                </form>
            ) : (
                <form>
                    {user && user.name ? (
                        <a href="">
                            <Link to="/posts">
                                <button>
                                    {user ? `welcom ${user.name }` : ""}
                                </button>
                            </Link>
                            <Route path="/posts" component={SignupModal} />
                        </a>
                    ) : (
                        <button>
                            no user
                        </button>
                    )}
                </form>
                
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

    
    const addPostClick = e => {
        console.log(11)
    }

    
    return (
        <Fragment>
            <nav>
                <ul>
                    <li>
                        {/* <Link to="/">jonglog</Link> */}
                        <a href="/">jonglog</a>
                    </li>
                     {userId ? authLink : guestLink}
                
                </ul>
            </nav>
        </Fragment>
    )
}

export default Nav