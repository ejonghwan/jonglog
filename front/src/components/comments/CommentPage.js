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
                <br /><hr />
                <button onClick={handleComment}>댓글달기</button>
                {commentTogle && <Recomment comments={comments}/>}
                <div>{comments.recomment[0]}</div>

                <br /><br />                
            </div>
        </Fragment>
    )
}

export default CommentPage;