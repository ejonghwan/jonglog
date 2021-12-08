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
router.get('/', async (req, res) => {

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
            // console.log('????????????????????????????', req.body)
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



// @routes   POST api/user/:username/profile
// @desc     Edit password
// @access   Private
router.post('/:username/profile', async(req, res) => {
    try{
        const { prevPassword, password, checkPassword, userId } = req.body;
        console.log('유저 프로필 레큐바디', req.body);

        const result = await User.findById(userId, 'password');
        bcrypt.compare(prevPassword, result.password).then(isMatch => { //bcrypt 에서 compare..이전비번과 db안에서 찾은 비번 비교해서
            if(!isMatch) {
                return res.status(400).json({match_error: '기존 비밀번호가 다릅니다'})
            } else {
                if(password === checkPassword) { // 만약 넘어온 비번과 디비저장된 비번이 같다면
                    bcrypt.genSalt(10, (err, salt) => { //salt 로 만들어줌 2의 10승으로 ..그 다음 반환된 salt를 해시로 만들어줌
                        bcrypt.hash(password, salt, (err, hash) => { //만들어진 해시를 result.password에 넣고 저장
                            if(err) throw err;
                            result.password = hash;
                            result.save();
                        })
                    })

                    res.status(200).json({ success: "비밀번호 변경 완료" })
                } else {
                    res.status(400).json({ error: "새로운 비밀번호가 다릅니다" })
                }
            }
        }) 

    } catch(err) {
        console.log(err)
    }
})


export default router;