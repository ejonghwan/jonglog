import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../common/button/Button.js'



const Category = ({ categoryFindResult }) => {


    // console.log(categoryFindResult)
    

    return (
        <Fragment>
            <ul className="caterogy_wrap">
            {/* { posts && <Button value={posts} classN={'btn_point_t3'} /> } */}
            {Array.isArray(categoryFindResult) && categoryFindResult.map(item => {
                return (
                    <li key={item._id}>
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