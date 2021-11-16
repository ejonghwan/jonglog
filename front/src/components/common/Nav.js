import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import LoginModal from '../auth/LoginModal.js'


const Nav = () => {

    const [ isOpen, setisOpen ] = useState(true)

    return (
        <Fragment>
            <nav>
                <ul>
                    <li>
                        {/* <Link to="/">jonglog</Link> */}
                        <a href="/">jonglog</a>
                    </li>
                     {isOpen === false ? (
                         <Fragment>
                           auth link
                        </Fragment>
                     ) : (
                         <Fragment>
                            <LoginModal />
                        </Fragment>
                     )}
                    

                </ul>
            </nav>
        </Fragment>
    )
}

export default Nav