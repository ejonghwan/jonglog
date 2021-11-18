import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


import User from '../../models/user.js';
import config from '../../config/index.js';


const { JWT_SECRET } = config;
const router = express.Router()



// @routes   GET api/user
// @desc     GET all userInfo
// @access   public
router.get('/', async (req, res, next) => {

    try{
        const users = await User.find();
        if(!users) throw Error("no user");

        res.status(201).json(users)

    } catch(err) {
        console.log(err);
        res.status(401).json({ message: err.message })
    }
})


// @routes   POST api/user
// @desc     Register user
// @access   public
router.post('/', async(req, res) => {
    try {
        const { name, email, password } = req.body;

        // validation
        if(!name || !email || !password) {
            console.log('????????????????????????????', req.body)
            return res.status(400).json({ message: '값을 채워줘~' })
        }

        // cehck for exising user
        User.findOne({ email: req.email }).then( user => {
            if(user) return res.status(400).json({ message: "이미 가입된 유저가 존재해요"}); 
            const newUser = new User({
                name,
                email,
                password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save().then( user => {
                        jwt.sign(
                            { id: user.id }, //첫번째 인자 아이디
                            JWT_SECRET, //두번째인자 시크릿 키 dotenv
                            { expiresIn: 3600 }, // 세번째로 지속시간 3600초  "10h, 10d" 10시간 혹은 10일
                            (err, token) => { //네번째 인자 콜백
                                if(err) throw err;
                                res.status(200).json({
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email,
                                    }
                                })
                                
                            }
                        )
                    })
                })
            })
            
        })


    } catch(err) {
        res.status(401).json({
            message: err.message,
        })
    }
})



export default router;