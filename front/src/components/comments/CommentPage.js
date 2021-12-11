import React, { Fragment, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import Recomment from '../../components/comments/ReComment.js'

const CommentPage = ({ comments }) => {

    // { contents, creator, date, _id, creatorName, recomment }

  

    const [ commentTogle, setCommentToggle ] = useState(false)
    // const {} = useSelector(state => state.posts)
    const dispatch = useDispatch();
    

    const handleComment = useCallback(e => {
        setCommentToggle(!commentTogle)
        // console.log(commentTogle)

        
    }, [commentTogle])

    return (
        <Fragment>
            <div>
                <div>작성자: {comments.creatorName ? comments.creatorName : comments.creator}</div>
                <div>시간: {comments.date}</div>
                <div>내용: {comments.contents}</div>
                <div>
                    <button>수정</button>|
                    <button>삭제</button>
                </div>
                {comments.recomment && comments.recomment.map(({ userName, contents, date }) => {
                    return (
                        <div>{`이름 ${userName} |   ${contents} |   ${date}`}</div>
                    )
                })}
                <br /><hr />
                <button onClick={handleComment}>댓글달기</button>
                {commentTogle && <Recomment comments={comments}/>}
               
                <br /><br />                
            </div>
        </Fragment>
    )
}

export default CommentPage;