import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import { editorConfiguration } from '../../components/editor/Edit.js'
import Myinit from '../../components/editor/UploadAdapter.js';


import { POST_EDIT_UPLOADING_REQUEST } from '../../redux/types.js';



const PostEdit = () => {
    
    const { isAuthenticated } = useSelector(state => state.user)
    const [ form, setValues ] = useState({ title: "", contents: "", fileUrl: "", category: "", })
    const { postDetail } = useSelector(state => state.posts) 
    const dispatch = useDispatch();

    const handleChange = useCallback(e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value,
        })
    }, [form])

    const handleSubmit = useCallback(e => {
        e.preventDefault();
        const { title, contents, fileUrl } = form // category 수정 나중에 추가
        const token = localStorage.getItem('token');
        const id = postDetail._id;
    
         dispatch({
            type: POST_EDIT_UPLOADING_REQUEST,
            data: {title, contents, fileUrl, token, id}
        })
    }, [form])

    const getDataFromCKEditor = (event, editor) => {
        // console.log('editor')
        const data = editor.getData();
        // console.log('??겟데이터',data)

        if(data && data.match("<img src=")) {
            const whereImg_start = data.indexOf("<img src=")
            console.log(whereImg_start)
            let whereImg_end = ""
            let ext_name_find = ""
            let result_img_url = ""
            const ext_name = ["jpeg", "png", "jpg", "gif", ]

            for(let i = 0; i < ext_name.length; i++) {
                if(data.match(ext_name[i])) {
                    console.log(data.indexOf(`${ext_name[i]}`))
                    ext_name_find = ext_name[i];
                    whereImg_end = data.indexOf(`${ext_name[i]}`);

                }
            }

            // console.log(ext_name_find)
            console.log(whereImg_end)

            if(ext_name_find === "jpeg") {
                result_img_url = data.substring(whereImg_start + 10, whereImg_end + 4)
            } else {
                result_img_url = data.substring(whereImg_start + 10, whereImg_end + 3)
            }

            console.log(result_img_url, 'result !!!??')

            setValues({
                ...form,
                fileUrl: result_img_url,
                contents: data,
            })
        } else {
            //사진 파일 안넣는경우
            setValues({
                ...form,
                fileUrl: `${process.env.REACT_APP_BASIC_IMGFILE_URL}imgs2.jpeg`,
                contents: data,
            })
        }
    }


    useEffect(() => {
        setValues({
            title: postDetail.title,
            contents: postDetail.contents,
            fileUrl: postDetail.fileUrl,
        })
    }, [postDetail.title, postDetail.contents, postDetail.fileUrl,])

 

    return (
        <Fragment>
            asdasdas
            { isAuthenticated ? (
                <Fragment>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title" >title</label>
                            <input type="text" name="title" id="title" value={form.title} onChange={handleChange} />
                        </div>
                        {/* <div>
                            <label htmlFor="category">category</label>
                            <input type="text" name="category" id="category" onChange={handleChange} />
                        </div> */}
                        <div>
                            <label htmlFor="contents">contents</label>
                           <CKEditor 
                                editor={ClassicEditor}
                                config={editorConfiguration}
                                onReady={Myinit}
                                // onInit={Myinit}
                                onBlur={getDataFromCKEditor}
                                data={postDetail.contents}
                           />
                        </div>
                        {/* <div>
                            <label htmlFor="fileUrl">fileUrl</label>
                            <input type="text" name="fileUrl" id="fileUrl" onChange={handleChange} />
                        </div> */}
                       
                        <button type="submit">제출!!</button>
                    </form>
                </Fragment>
                ) : (
                <Fragment>
                    loading bar
                </Fragment>
                ) }
            {/* <Edit /> */}
        </Fragment>
    )
}


export default PostEdit;