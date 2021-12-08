import React, { Fragment, useEffect } from 'react';
import { useHistory, Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'

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
import { EditProtectedRoute, ProfileProtectedRoute } from './protectedRoute/index.js';
import Category from '../components/category/Category.js'

// import loadUser from '../components/auth/loadUser.js';

// test
import axios from 'axios'

const RouterPage = () => {

    const { posts, categoryFindResult, postDetail } = useSelector(state => state.posts);
    const { categorys, userName } = useSelector(state => state.user)


    console.log('??? dbwjspldanadidajkskdnalsdnlkasda', userName)




    useEffect(() => {
        // if(categoryFindResult) {
        //     console.log('123123123123123', categoryFindResult)
        // }
       
    }, [categoryFindResult])




    // 리다이렉트 테스트 서버쪽엔 app.js
    // const history = useHistory();
    // console.log(history)

    // useEffect( async () => {
    //     const config = {
    //         headers: {
    //             "hohohehehe": "asdasdasdasdasdasd value"
    //         }
    //     }
    //     const aa = await axios.post('http://localhost:3000/test/hoho', { name: "jonghwan" }, config)
    //     history.push(`/test/hoho/${aa.data.pay}`)
    //     await console.log('asdassad???', aa)
    // }, [])
    

    return(
        <Fragment>
            <Helmet title="홈 | 종환 blog"></Helmet>
            <Header />
            <Main>
                <Category categoryFindResult={categorys}/>
                <Switch>
                    
                    <Route path="/" exact component={PostCardList}></Route>
                    <Route path="/post/category/:categoryName" exact component={CategoryRoute}></Route>
                    <Route path="/post/:id" exact component={PostPage}></Route>
                    <Route path="/post" exact component={PostWrite}></Route>
                    <Route path="/search/:searchTerm" exact component={Search}></Route>
                    <Route path="/guide" exact component={Guide} ></Route>

                    {/* 리다이렉트 테스트 */}
                    {/* <Route path="/test/hoho/jonghwan" exact component={Guide} ></Route> */}


                    {/* <Route path="/post/:id/edit" exact component={PostEdit} /> */}
                    <EditProtectedRoute 
                        path="/post/:id/edit" exact component={PostEdit}
                    />
                    <ProfileProtectedRoute 
                        path="/user/:userName/profile"
                        exact
                        component={Profile}
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