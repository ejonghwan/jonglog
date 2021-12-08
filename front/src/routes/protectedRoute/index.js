
import { Component, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

// post edit
export const EditProtectedRoute = ({ component: Component, ...rest }) => {
    const { userId } = useSelector(state => state.user)
    const { creatorId } = useSelector(state => state.posts)

    // useEffect(() => {
    //     console.log(userId, creatorId, 'asdaskdjasldkalksdjlaksdas')
    // }, [])
return (

    // 유저 아이디와 생성자 아이디가 같다면 렌더링을 그대로 진행하고 다르다면 강제로 홈으로 보냄으로 접근자체를 못하게함 
    // 서버쪽에서 어스 미들웨어를 했지만 프론트에서도 보안을 하나 더 함
    <Route 
        {...rest}
        render = {(props) => {
            if(userId === creatorId) { 
                return <Component {...props} /> 
            } else {
                return (
                    <Redirect 
                        to={{
                            pathname:'/',
                            state: {
                                from: props.location
                            }
                        }}
                    />
                )
            }
        }}
    />
)
}



// password edit
export const ProfileProtectedRoute = ({ component: Component, ...rest }) => {
    const { userName } = useSelector(state => state.user)
    
return (

    <Route 
        {...rest}
        render = {(props) => {
            // console.log('이건 대체 뭐냐 하 ..', props) //- history임
            if(props.match.params.userName === userName) { 
                return <Component {...props} />  //맞으면 계속 진행
            } else {
                return (
                    <Redirect 
                        to={{
                            pathname:'/',
                            state: {
                                from: props.location,
                            }
                        }}
                    />
                )
            }
        }}
    />
)
}

