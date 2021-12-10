import mongoose from 'mongoose';
import moment from 'moment';

const CommentSchema = new mongoose.Schema({
    contents: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: moment().format("YYYY-MM-DD hh:mm:ss")
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    creatorName: {
        type: String,
    },
    recomment: [{
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }, 
        userName: {
            type: String,
            required: true,
        },
        contents: {
            type: String,
            required: true,
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'posts',
        },
        date: {
            type: String,
            default: moment().format("YYYY-MM-DD hh:mm:ss")
        },
    }]
})

const Comment = mongoose.model("comment", CommentSchema)
export default Comment;