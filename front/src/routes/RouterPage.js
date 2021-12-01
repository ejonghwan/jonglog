import React, { Fragment,  } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Header from '../components/common/Header.js'
import Footer from '../components/common/Footer.js'
import Main from '../components/common/Main'

import CategoryRoute from './normalRoute/CategoryRoute'
import PostPage from './normalRoute/PostPage'
import PostCardList from './normalRoute/PostCardList'
import PostEdit from './normalRoute/PostEdit'
import PostWrite from './normalRoute/PostWrite.js'
import Profile from './normalRoute/Profile'
import Search from './normalRoute/Search'
import Guide from '../components/common/Guide.js';
import { EditProtectedRoute } from './protectedRoute/index.js';


const RouterPage = () => {
    return(
        <Fragment>
            <Header />
            
            
            <Main>
                <Switch>
                    
                    <Route path="/" exact component={PostCardList}></Route>
                    <Route path="/post/category/:categoryName" exact component={CategoryRoute}></Route>
                    <Route path="/post/:id" exact component={PostPage}></Route>
                    <Route path="/post" exact component={PostWrite}></Route>
                    <Route path="/search/:searchTerm" exact component={Search}></Route>
                    <Route path="/guide" exact component={Guide} ></Route>


                    {/* <Route path="/post/:id/edit" exact component={PostEdit} /> */}
                    <EditProtectedRoute 
                        path="/post/:id/edit" exact component={PostEdit}
                    />
                    
                    {/* <Route path="*" component={ to="/" }/> */}
                    <Redirect from="*" to='/' />

                </Switch>


                {/* <Routes>
                <Route path="/" element={<Main />}></Route>
                <Route path="/post/category/:categoryName" element={<CategoryRoute />}></Route>
                <Route path="/post/:id" element={<PostPage />}></Route>
                <Route path="/post" element={<PostWrite />}></Route>
                <Route path="/search/:searchTerm" element={<Search />}></Route>
                <Route path="*" element={<Navigate to="/" />}/>
                <Route path="/guide" element={<Guide />} ></Route>
                </Routes> */}
            </Main>

            <Footer />
        </Fragment>
    )
}

export default RouterPage;