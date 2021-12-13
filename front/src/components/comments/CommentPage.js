import React, { Fragment, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import Recomment from '../../components/comments/ReComment.js'
import { COMMENT_EDIT_REQUEST } from '../../redux/types.js'

const CommentPage = ({ commentsList }) => {

    // { contents, creator, date, _id, creatorName, recomment }

  

    const [ commentTogle, setCommentToggle ] = useState(false)
    const [ editToggle, setEditToggle] = useState(false)
    const [ form, setValues ] = useState({ content: commentsList.contents, }); 


    const dispatch = useDispatch();
    const { userId } = useSelector(state => state.user);
    // const { comments } = useSelector(state => state.comment);
    

    console.log(commentsList._id, '에헿라라라라')

    const handleCreateComment = useCallback(e => {
        setCommentToggle(!commentTogle)
        // console.log(commentTogle)
    }, [commentTogle])


    // edit
    const handleEditToggle = useCallback(e => {
        setEditToggle(!editToggle)
    }, [editToggle])

    const handleEditChange = useCallback(e => {
        const { content } = form; 
        setValues({
            ...form,
            [e.target.name]: e.target.value
        })
        // console.log(content)

    }, [form.content])
    const handleEditComment = useCallback(e => {
        e.preventDefault();
        dispatch({
            type: COMMENT_EDIT_REQUEST,
            data: { commentId: commentsList._id, content: form.content },
        })
        console.log({ commentId: commentsList._id, contents: form.content,  })  // 보낼거까지 함...여기부터 
    }, [dispatch, form.content])



    return (
        <Fragment>
            <div>
                <div>id: {commentsList._id}</div>
                <div>작성자: {commentsList.creatorName ? commentsList.creatorName : commentsList.creator}</div>
                <div>시간: {commentsList.date}</div>
                <div>내용: 
                    {editToggle ? (
                        <form>
                            <div>
                                {/* <label htmlFor="content">내용</label> */}
                                <input id="content" name="content" type="text" value={form.content} onChange={handleEditChange} required />
                            </div>
                            <button onClick={handleEditComment}>수정 완료</button>
                        </form>
                    ) : (
                        <div>
                            {commentsList.contents}
                        </div>
                    )}
                </div>
                <div>
                    
                    {userId === commentsList.creator ? ( // 코멘트 리스트에 아이디와 지금 유저아이닥 같으면 수정삭제 보이기
                        <div>
                            <button onClick={handleEditToggle}>수정</button>|
                            <button>삭제</button>
                        </div>
                        ) : null
                    }

                   
    
                </div>

                {/* recomment */}
                {commentsList.recomment && commentsList.recomment.map(({ userName, contents, date }) => {
                    return (
                        <div>{`이름 ${userName} |   ${contents} |   ${date}`}</div>
                    )
                })}
                <br /><hr />
                <button onClick={handleCreateComment}>댓글달기</button>
                {commentTogle && <Recomment comments={commentsList}/>}
               
                <br /><br />                
            </div>
        </Fragment>
    )
}

export default CommentPage;