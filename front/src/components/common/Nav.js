import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';


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
                     {isOpen === true ? (
                         <Fragment>
                            <li>
                                {/* <Link to="/login">login</Link> */}
                                <a href="/login">login</a>
                            </li>
                            <li>
                                {/* <Link to="/signup">signup</Link> */}
                                <a href="/signup">signup</a>
                            </li>
                        </Fragment>
                     ) : (
                         <Fragment>
                            'nononono'
                        </Fragment>
                     )}
                    

                </ul>
            </nav>
        </Fragment>
    )
}

export default Nav