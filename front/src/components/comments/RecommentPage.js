import React, { Fragment, useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RECOMMENT_EDIT_REQUEST } from '../../redux/types';



const RecommentPage = ({ recommentItem, userId, commentsList }) => {

    const dispatch = useDispatch()

    const { userName, contents, date, creator, _id } = recommentItem;
    const [form, setValues] = useState({ contents: contents })
    const [ recommentToggle, setRecommentToggle ] = useState(false)

    // console.log('recomment page: ', userName, contents, date, creator)

    // console.log('hohohohoho???', commentsList)
    // console.log('hohohohoho???', recommentItem)

    //recomment
    const handleRecommentChange = useCallback(e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value,
        })
    }, [form.contents])
    
    const handleRecommentSubmit = useCallback(e => {
        e.preventDefault();
        dispatch({
            type: RECOMMENT_EDIT_REQUEST,
            data: { commentId: commentsList._id, recommentId: _id, contents: form.contents }
        })
        setRecommentToggle(false)
    }, [dispatch])

     const handleRecommentEdit = useCallback(e => {
        e.preventDefault();
        setRecommentToggle(!recommentToggle)
       
    }, [recommentToggle])

    const handleRecommentDelete = useCallback(e => {
        e.preventDefault();

    }, [])


    useEffect(() => {
        // console.log(form.contents)
    }, [form.contents])



    return (
        <Fragment>
             <div>{recommentToggle ? (
                 <div>
                     <form onSubmit={handleRecommentSubmit}>
                        <input id="contents" type="text" name="contents" value={form.contents} onChange={handleRecommentChange}/>
                        <button type="submit">수정완료</button>
                     </form>
                 </div>
             ) : (
                 <div>
                    {`이름 ${userName} |   ${contents} |   ${date}`}
                 </div>
             )}

                    <div>{creator && creator === userId ? (
                        <span>recomment
                            <button onClick={handleRecommentEdit}>수정</button> |
                            <button onClick={handleRecommentDelete}>삭제</button>
                        </span>
                    ) : null }
                    </div>
                </div>
        </Fragment>
    )
}


export default RecommentPage;