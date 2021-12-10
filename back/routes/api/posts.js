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
        const categoryFindResult = await Category.find()
        const postFindResult = await Post.find();

        const result = { postFindResult, categoryFindResult }
        // console.log(postFindResult, "All post")
        res.json(result)
        
    } catch(err) {
        console.log(err)
    }
    
}) 



// @routes   POST api/post
// @desc     Create a Post
// @access   private
router.post('/', auth, uploadS3.none(), async (req, res, next) => {
    
    try {
        // console.log(req.user, '이거 꼭 확인 아이디 req')

        const { title, contents, fileUrl, creator, category } = req.body; 
        const newPost = await Post.create({
            title,
            contents,
            fileUrl,
            creator: req.user.id,
            categoryName: category,
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
                $push: { 
                    category: newCategory._id,
                } //$달러표시는 배열로 넣어줌
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
                categoryName: findCaterory.categoryName,
            })
            await User.findByIdAndUpdate(req.user.id, {
                $push: { posts: newPost._id }
            })
        }
        
        res.redirect(`/api/post/${newPost._id}`) //보내준 주소로 ..사가쪽에서 react router 작업 해야됨 
       

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
        // const categoryFindResult = await Category.find()
        // const result = {post, categoryFindResult}
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
router.post('/:id/comments', auth, async(req, res, next) => {
    try {
        console.log(req.body, '레큐바디 아이디 !!!!!!!! 아오')
        const createComment = await Comment.create({
            contents: req.body.contents,
            creator: req.body.userId,
            creatorName: req.body.userName,
            post: req.body.postId,
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
                    post_id: req.body.postId,
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


// @routes   Delete api/post/:id/
// @desc     delete
// @access   private
router.delete('/:id', auth, async(req, res) => {
    try {
        console.log(req.user)
        await Post.deleteMany({ _id: req.params.id }); //포스트에서 지워주고
        await Comment.deleteMany({ post: req.params.id }) //코멘트에서 지워주고
        await User.findByIdAndUpdate(req.user.id, { //유저에서 포스트와 코멘트 안에서의 포스트도 지워준다
            $pull: { //pull은 배열에서 빼줄때. push는 넣을때
                posts: req.params.id,
                comments: { post_id: req.params.id }
            }
        })

        const CategoryUpdate = await Category.findOneAndUpdate(
            { posts: req.params.id }, 
            { $pull: { posts: req.params.id } },
            { new: true } //new 는 업데이트를 적용시켜줌 
            )

        if(CategoryUpdate.posts.length === 0) { //해당 카테고리가 없으면 카테고리목록에서 삭제
            await Category.deleteMany({ _id: CategoryUpdate })
        }

        res.status(200).json({
            msg: '성공스'
        })

    } catch(err) {
        res.status(400).json({
            msg: err
        })
    }
})

// @routes   Post api/post/comment/recomment
// @desc     edit post
// @access   private
router.post('/comment/recomment', auth, async (req, res) => {
    try {

        console.log('대댓글 페이로드 : ', req.body )
        const creatorFind = await User.findOne({ _id: req.body.userId }) //얘 유저에 밀어넣어야됨 아직작업안함
        const parentComment = await Comment.findOneAndUpdate({
            _id: req.body.commentId
        }, {
            $push: {
                recomment: {
                    creator: req.body.userId,
                    userName: req.body.userName,
                    contents: req.body.contents,
                    date: req.body.date,
                    postId: req.body.postId,
                }
            },
        },
        { new: true },
        )

        parentComment.save()
        res.redirect(`/api/post/${req.body.postId}`);
        // res.status(200).json(parentComment)
        
    } catch(err) {
        console.log(err)
    }
})



// @routes   Get api/post/:id/edit
// @desc     edit post
// @access   private
router.get('/:id/edit', auth, async (req, res, next) => { // 수정전 해당 게시물 찾기
    try {
        const post = await Post.findById(req.params.id).papulate('creator', 'name')
        res.json(post)
    } catch(err) {
        console.error(err)
    }
})

// @routes   Post api/post/:id/edit
// @desc     edit post
// @access   private
router.post('/:id/edit', auth, async(req, res, next) => {
    console.log(req, '에딧에 req는 무엇인고 -_-')
    const { body: { title, contents, fileUrl, id } } = req;

    try {
        const modifiedPost = await Post.findByIdAndUpdate(
            id, { title, contents, fileUrl, date:moment().format('YYYY-mm-dd hh:mm:ss') },
            { new: true }
        )
        // console.log(modifiedPost)
        res.redirect(`/api/post/${modifiedPost.id}`)
    } catch(err) {
        console.error(err)
    }

})


// @routes   Get api/post/category/:categoryName
// @desc     edit post
// @access   private
router.get('/category/:categoryName', async (req, res) => {
    try {

        const categoryFindResult = await Category.findOne({
            categoryName: {
                //$regex 이런 $ 들은 mongoDB에서 쓰는 정규표현식 orm. 주의점은 몽고디비+몽구스 메서드 섞어쓰면 작동안될수도 있음
                $regex: req.params.categoryName, 
                $options: "i"
            }
        }, "posts").populate({ path: "posts" })
        // categoryName에서 아래 두 옵션을 준 설정 후 Category Model > posts객체에서 찾으라는 말. 그래서 posts 경로 만들어 populate 채워라.

        console.log(categoryFindResult)

        res.status(200).json(categoryFindResult)
    } catch(err) {
        console.log(err)
    }
})





export default router;