import mongoose from 'mongoose';
import moment from 'moment';

// import bycript from 'bcrypt';

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
                ref: "comment",
            },
        }
    ],
    recomment: [
        {
            recomment_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'comment',
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


// bycript model에서 처리 할 때.. user.save 바로 직전 실행순서... 
// UserSchema.pre('save', next => {
//     let user = this;
//     if(user.isModified('password')) { //이렇게할 땐 비번만 변경됐을 때 실행하게끔 해줘야됨 
//         bycript.genSalt(10, user.password, (err, salt) => { //설트수치랑 비번 콜백 
//             if(err) return next(err)

//             bycript.hash(user.password, salt, (err, hash) => { //비번이랑 설트 콜백 받음
//                 if(err) return next(err);
//                 user.password = hash;
//                 next()
//             })
//         })    
//     } else {
//         next();
//     }
// })





const User = mongoose.model("user", UserSchema)
export default User