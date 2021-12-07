import React, { useRef, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH_REQUEST } from '../../redux/types';

const Search = () => {



    const dispatch = useDispatch();
    const [form, setValues] = useState({ searchBy: "" });

    const resetValue = useRef(null)

    const handleChange = e => {
        e.preventDefault();
        setValues({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async e => {
        await e.preventDefault();
        const { searchBy } = await form;
        dispatch({
            type: SEARCH_REQUEST,
            data: searchBy,
        })

        console.log('서치 컴포넌트 검색어', searchBy)
        resetValue.current.value = ''

    }


   

    

    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <input name="searchBy" ref={resetValue} onChange={handleChange} />
                <button type="submit">검색</button>
            </form>
        </Fragment>
    )
}

export default Search;