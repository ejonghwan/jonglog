import express from 'express';
import multer from 'multer';
import multers3 from 'multer-s3';
import path from 'path';
import aws from 'aws-sdk';
import dotenv from 'dotenv';

//model
import Post from '../../models/post.js';
import Category from '../../models/category.js'
import User from '../../models/user.js'
import Comment from '../../models/comment.js'

// middleware
import auth from '../../middleware/auth.js'
import moment from 'moment';
import { isNullOrUndefined } from 'util';


const router = express.Router()
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY,
})

const uploadS3 = multer({
    storage: multers3({
        s3,
        bucket: "jonglog/upload",
        region: "ap-northeast-2",
        key(req, file, cb) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname)
            cb(null, basename + new Date().valueOf + ext)
        }
    }),
    limits: {fileSize: 100*1024*1024},
})


// @routes   POST api/post/image
// @desc     Create a Post
// @access   private
router.post('/image', uploadS3.array("upload", 5), async (req, res, next) => {
    try {
        // console.log(req.files.map(v => v.location))
        res.json({ uploaded: true, url: req.files.map(v => v.location) })
    } catch(err) {
        console.error(err)
        res.json({uploaded: false, url: null})
    }
})


// @routes   GET api/post
// @desc     all post request
// @access   public
router.get('/', async (req, res, next) => {

    try {
        const postFindResult = await Post.find();
        console.log(postFindResult, "All post")

        res.json(postFindResult)
    } catch(err) {
        console.log(err)
    }
    
}) 



// @routes   POST api/post
// @desc     Create a Post
// @access   private
router.post('/', auth, uploadS3.none(), async (req, res, next) => {
    try {
        console.log(req.user, '이거 꼭 확인 아이디 req')

        const { title, contents, fileUrl, creator, category } = req.body; 
        const newPost = await Post.create({
            title,
            contents,
            fileUrl,
            creator: req.user.id,
            // date: moment.format('YYYY-MM-DD hh:mm:ss')
        });

        const findCaterory = await Category.findOne({
            categoryName: category, //모델에 설정한 객체값과: 넘어온 값 하나를 찾아줌
        })
        // console.log(findCaterory)

        if(isNullOrUndefined(findCaterory)) { //카테고리가 없는 경우
            const newCategory = await Category.create({
                categoryName: category,
            })
            // 포스트를 찾아서 카테고리와 연결
            await Post.findByIdAndUpdate(newPost._id, {
                $push: { category: newCategory._id } //$달러표시는 배열로 넣어줌
            })
            // 카테고리를 찾아서 포스트와 연결
            await Category.findByIdAndUpdate(newCategory._id, {
                $push: { posts: newPost._id }
            })
            // 글쓴 사람과 포스트 연결
            await User.findByIdAndUpdate(req.user.id, {
                $push: { posts: newPost._id }
            })

        } else {
            //카테고리가 있는경우 
            await Category.findByIdAndUpdate(findCaterory._id, {
                $push: { posts: newPost._id }
            })
            await Post.findByIdAndUpdate(newPost._id, {
                category: findCaterory._id,
            })
            await User.findByIdAndUpdate(req.user.id, {
                $push: { posts: newPost._id }
            })
        }
        
        res.redirect(`/api/post/${newPost._id}`)
        // return res.json('tlqkf')

        // res.json(newPost)

    } catch(err) {
        console.log(err)
    }
})


// @routes   POST api/post/:id
// @desc     Detail Post 
// @access   public
router.get('/:id', async(req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate('creator', 'name').populate({ path: 'category', select: 'categoryName' }) //populate는 모델에 있는 object.id로 연결되어있는 것들을?  만들어달란 요청 ?
        post.views += 1
        post.save()
        // console.log(post);
        res.json(post)
    } catch(err) {
        console.error(err);
        next(err)
    }
})



// @routes   GET api/post/:id/comments
// @desc     get all comments
// @access   public
router.get('/:id/comments', async(req, res) => {
    try {
        const comment = await Post.findById(req.params.id).populate({ // params에 해당 게시물 아이디
            path: "comments", //path는 모델에 연결되어있는 이름들임. ref 아님. 여기서는 model post 에 있는 comments
        })  
        const result = comment.comments;
        // console.log(comment, "comment log임")

        res.status(200).json(result)

    } catch(err) {
        console.log(err)
        // res.redirect('/')
    }
})


// @routes   POST api/post/:id/comments
// @desc     create comments
// @access   private
router.post('/:id/comments', async(req, res, next) => {
    try {
        console.log(req.body.userId, '레큐바디 아이디 !!!!!!!! 아오')
        const createComment = await Comment.create({
            contents: req.body.contents,
            creator: req.body.userId,
            creatorName: req.body.userName,
            post: req.body.id,
            date: moment().format('YYYY-MM-DD hh:mm:ss'),
        })
        
        await Post.findByIdAndUpdate(req.params.id, { // body로 넘어온 아이디로 포스트를 찾은 후 거기에 연결된 코멘트를 업데이트
            $push: {
                comments: createComment._id,
            }
        })
        await User.findByIdAndUpdate(req.body.userId, { //마찬가지로 유저에 있는 코멘트에도 업데이트
            $push: {
                comments: { //글삭 했을 때 코멘트도 같이 지우기위해
                    post_id: req.body.id,
                    comment_id: createComment._id,
                }
            } 
        })
        res.status(200).json(createComment)
        // console.log(createComment, '코멘트 생성')
    } catch (err) {
        console.log(err)
    }
})


export default router;