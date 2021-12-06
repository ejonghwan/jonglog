import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../common/button/Button.js'



const Category = ({ categoryFindResult }) => {


    console.log(categoryFindResult)
    

    return (
        <Fragment>
            <ul className="caterogy_wrap">
            {/* { posts && <Button value={posts} classN={'btn_point_t3'} /> } */}
            {Array.isArray(categoryFindResult) && categoryFindResult.map(item => {
                return (
                    <li>
                        <Button value={`#${item.categoryName}`} classN={'btn_point_t3'} />
                    </li>
                )
            })}
            </ul>
           
        </Fragment>
    )
}

export default Category;