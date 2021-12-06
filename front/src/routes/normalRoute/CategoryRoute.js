import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { CATEGORY_FIND_REQUEST } from '../../redux/types';


const CategoryRoute = (req) => {

    const dispatch = useDispatch()

    useEffect(() => {
        // console.log('???')
        dispatch({
            type: CATEGORY_FIND_REQUEST,
            data: req.match.params.categoryName
        })
    }, [])
    console.log(req.match)

    return (
        <Fragment>
            category
        </Fragment>
    )
}


export default CategoryRoute;