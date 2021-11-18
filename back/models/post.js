import mongoose from 'mongoose';
import moment from 'moment';

const { Schema } = mongoose

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true, //검색기능 향상 나중에 검색해보자
    },
    contents: {
        type: String,
        required: true,
    },
    views: { 
        type: Number,
        default: -2, //처음 작성한 사람의 조회가 집계돼서 -2로  
    },
    fileUrl: {
        type: String,
        default: "https://source.unsplash.com/random/301x201",
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    },
    date: {
        type: String,
        default: moment().format("YYYY-MM-DD hh:mm:ss"),
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment",
        },
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }
})

const Post = mongoose.model("post", PostSchema)
export default Post;