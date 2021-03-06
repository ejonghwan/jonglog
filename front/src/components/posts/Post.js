import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMouse, faEye } from '@fortawesome/free-solid-svg-icons'

import { useSelector } from 'react-redux'

const Post = ({ posts }) => {

    const { categoryFindResult } = useSelector(state => state.posts)
    // console.log(categoryFindResult)

    
    useEffect(() => {
        console.log("post: ", posts)
    }, [])
    return (
        <Fragment>
            post
            
            <ul className="main_card_list">
            {
                Array.isArray(posts) ? posts.map(({ _id, title, fileUrl, comments, views, category, categoryName, contents }, idx) => {
                    return (
                        <li key={_id} >
                            <Link to={`/post/${_id}`}>
                                <div>
                                    {/* <img src={fileUrl} alt={fileUrl} /> */}
                                </div>
                                <article>
                                    <h3>{title}</h3>
                                    {/* <FontAwesomeIcon icon={faEye} />  */}
                                    {/* &nbsp;  */}
                                    <span className="view_num">{`์กฐํ ${views}`}</span>
                                    <span>{`๋๊ธ ${comments.length}`}</span>
                                    <span>{categoryName}</span>
                                    <br /><br />
                                    {/* <span>{contents}</span> */}
                                    

                                </article>
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