import mongoose from 'mongoose';
import moment from 'moment';

const { Schema } = mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["MainJuin", "SubJuin", "User"],
        default: "User",
    },
    register_date: {
        type: Date,
        default: moment().format("YYYY-MM-DD hh:mm:ss"),
    },
    comments: [
        { // 글을 지웠을 때 해당 글과 코멘트를 한번에 지우기 위해
            post_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "post",
            }, 
            comment_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "comments",
            }
        }
    ],

    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts",
        }
    ],
})

const User = mongoose.model("user", UserSchema)
export default User