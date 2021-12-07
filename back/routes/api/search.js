import express from 'express';
const router = express.Router();

import Post from '../../models/post.js'


router.get('/:searchTerm', async(req, res, next) => {
    try {
        const result = await Post.find({
           title: {
               $regex: req.params.searchTerm,
               $options: 'i',
           }
        });

        console.log('search result', result)
        res.status(200).json(result);

    } catch(err) {
        console.log(err)
        next(err)
    }
})


export default router;