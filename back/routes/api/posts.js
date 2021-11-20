import express from 'express';
import multer from 'multer';
import multers3 from 'multer-s3';
import path from 'path';
import aws from 'aws-sdk';
import dotenv from 'dotenv';

//model
import Post from '../../models/post.js';

// middleware
import auth from '../../middleware/auth.js'


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
        console.log(req.files.map(v => v.location))
        res.json({ uploaded: true, url: req.files.map(v => v.location) })
    } catch(err) {
        console.error(err)
        res.json({uploaded: false, url: null})
    }
})


// api/post
router.get('/', async (req, res, next) => {

    try {
        const postFindResult = await Post.find();
        console.log(postFindResult, "All post")

        res.json(postFindResult)
    } catch(err) {
        console.log(err)
    }
    
}) 



router.post('/', auth, async (req, res, next) => {
    try {
        console.log(req, 'req')

        const { title, contents, fileUrl, creator } = req.body; 
        const newPost = await Post.create({
            title,
            contents,
            fileUrl,
            creator,
        });

        res.json(newPost)

    } catch(err) {
        console.log(err)
    }
})


export default router;