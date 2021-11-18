import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMouse } from '@fortawesome/free-solid-svg-icons'


const Post = ({ posts }) => {

    useEffect(() => {
        console.log("post: ", posts)
    }, [])
    return (
        <Fragment>
            post
            
            <ul>
            {
                Array.isArray(posts) ? posts.map(({ _id, title, fileUrl, comments, views }) => {
                    return (
                        <li key={_id} >
                            <Link to={`/post/${_id}`}>
                                <div>
                                    <img src={fileUrl} alt={fileUrl} />
                                </div>
                                <div>
                                    <h3>{title}</h3>
                                    <FontAwesomeIcon icon={faMouse} />
                                    &nbsp;
                                    <span>{views}</span>
                                </div>
                            </Link>
                        </li>
                    )
                }) : null
            }
            </ul>
        </Fragment>
    )
}

export default Post