import express from 'express';

//model
import Post from '../../models/post.js';

// middleware
import auth from '../../middleware/auth.js'

const router = express.Router()


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