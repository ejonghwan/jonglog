import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CATEGORY_FIND_REQUEST } from '../../redux/types.js';
import Button from '../common/button/Button.js'



const Category = ({ categoryFindResult }) => {

    const dispatch = useDispatch()
    // console.log(categoryFindResult)
  

    // const handleClick = (categoryName) => {
    //     return () => {
    //         dispatch({
    //             type: CATEGORY_FIND_REQUEST,
    //             data: categoryName
    //         })
    //     }
    // }

    const handleClick = (categoryName) => () => {
            dispatch({
                type: CATEGORY_FIND_REQUEST,
                data: categoryName
            })
    }


    return (
        <Fragment>
            <ul className="caterogy_wrap">
            {/* { posts && <Button value={posts} classN={'btn_point_t3'} /> } */}
            {Array.isArray(categoryFindResult) && categoryFindResult.map(item => {
                return (
                    <li key={item._id} onClick={handleClick(item.categoryName)}>
                        <Link to={`/post/category/${item.categoryName}`}>
                            <Button value={`#${item.categoryName}`} classN={'btn_point_t3'} />
                        </Link>
                    </li>
                )
            })}
            </ul>
           
        </Fragment>
    )
}

export default Category;