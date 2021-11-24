import React, { Fragment,  } from 'react';
import { Routes, Router, Route, Navigate } from 'react-router-dom';

import Header from '../components/common/Header.js'
import Footer from '../components/common/Footer.js'
import Main from '../components/common/Main'

import CategoryRoute from './normalRoute/CategoryRoute'
import PostPage from './normalRoute/PostPage'
import PostCardList from './normalRoute/PostCardList'
import PostEdit from './normalRoute/PostEdit'
import PostWrite from './normalRoute/PostWrite'
import Profile from './normalRoute/Profile'
import Search from './normalRoute/Search'
import Guide from '../components/common/Guide.js';


const RouterPage = () => {
    return(
        <Fragment>
            <Header />
            
            <Routes>
               
                <Route path="/" element={<Main />}></Route>
                <Route path="/post/category/:categoryName" element={<CategoryRoute />}></Route>
                <Route path="/post/:id" element={<PostPage />}></Route>
               
                <Route path="/post" element={<PostWrite />}></Route>
                {/* <Route path="/" element={Profile}></Route> */}
                {/* <Route path="/" element={PostEdit}></Route> */}
                <Route path="/search/:searchTerm" element={<Search />}></Route>
                <Route path="*" element={<Navigate to="/" />}/>
                <Route path="/guide" element={<Guide />} ></Route>
            </Routes>

            <Footer />
        </Fragment>
    )
}

export default RouterPage;