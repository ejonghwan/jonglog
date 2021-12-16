import React, { Fragment, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { COMMENT_EDIT_REQUEST, COMMENT_DELETE_REQUEST } from '../../redux/types.js'


//components
import Recomment from '../../components/comments/ReComment.js'
import RecommentPage from '../../components/comments/RecommentPage.js'




const CommentPage = ({ commentsList }) => {

    // { contents, creator, date, _id, creatorName, recomment }

    const [ commentTogle, setCommentToggle ] = useState(false)
    const [ editToggle, setEditToggle] = useState(false)
    const [ form, setValues ] = useState({ content: commentsList.contents, }); 


    const dispatch = useDispatch();
    const { userId } = useSelector(state => state.user);
    // const { comments } = useSelector(state => state.comment);
    

    // console.log(commentsList._id, '에헿라라라라')

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
        setEditToggle(false);
        // console.log({ commentId: commentsList._id, contents: form.content,  })  // 보낼거까지 함...여기부터 
    }, [dispatch, form.content, editToggle])

    const handleCommentDelete = useCallback( e => {
        e.preventDefault();
        if(window.confirm('정말 삭제할까요?')) {
            dispatch({
                type: COMMENT_DELETE_REQUEST,
                data: { commentId: commentsList._id },
            })
        }
    }, [dispatch])


   
    


    return (
        <Fragment>
            <div>
                <div>id: {commentsList._id}</div>
                <div>작성자: {commentsList.creatorName ? commentsList.creatorName : commentsList.creator}</div>
                <div>
                    시간: {commentsList.date} 
                    {commentsList.delete ? (<span>(삭제됨)</span>) : null} 
                    {commentsList.isEdit && !commentsList.delete ? (<span>(수정됨)</span>) : null}
                </div>
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
                        <span>
                            {commentsList.contents}
                        </span>
                    )}
                </div>
                <div>
                    
                    {userId === commentsList.creator && !editToggle && !commentsList.delete ? ( // 코멘트 리스트에 아이디와 지금 유저아이닥 같으면 수정삭제 보이기
                        <div>comment
                            <button onClick={handleEditToggle}>수정</button>|
                            <button onClick={handleCommentDelete}>삭제</button>
                        </div>
                        ) : null
                    }

                   
    
                </div>

                {/* recomment view*/}
                {commentsList.recomment && commentsList.recomment.map( item => {
                    // console.log('gpgpgpgpgp', item)
                    return <RecommentPage key={item._id} commentsList={commentsList} recommentItem={item} userId={userId} />
                })}
                <br /><hr />
                {/* recomment form component */}
                <button onClick={handleCreateComment}>댓글달기</button>
                {commentTogle && <Recomment commentsList={commentsList} recommentToggle={setCommentToggle} />}
               
                <br /><br />                
            </div>
        </Fragment>
    )
}

export default CommentPage;