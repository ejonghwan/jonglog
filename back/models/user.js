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
        {
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
            ref: "post",
        }
    ],
})

const User = mongoose.model("user", UserSchema)
export default User