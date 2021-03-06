import mongoose from 'mongoose';
import moment from 'moment';
import comment from './comment.js'; // --;; 참조하는 모델은 임폴트 해줘야함....안하면 에러.....에혀

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
        default: 0, //처음 작성한 사람의 조회가 집계돼서 -2로  
    },
    fileUrl: {
        type: String,
        default: "https://source.unsplash.com/random/301x201",
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    },
    categoryName: {
        type: String,
        ref: 'category',
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