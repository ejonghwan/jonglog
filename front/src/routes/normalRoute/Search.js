import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { SEARCH_REQUEST } from '../../redux/types';

// components
import Post from '../../components/posts/Post.js'



const Search = () => {

    const dispatch = useDispatch();
    const { searchResult } = useSelector(state => state.posts)
    let { searchTerm } = useParams();

    console.log("숼취 값 ", useParams)

    useEffect(() => {
        if(searchTerm) {
            dispatch({
                type: SEARCH_REQUEST,
                data: searchTerm,
            });
        };
    }, [dispatch, searchTerm])

    return (
        <Fragment>
            <h1>검색 결과: {searchTerm}</h1>
            <div>
                <Post posts={searchResult}/>
            </div>
        </Fragment>
    )
}


export default Search;