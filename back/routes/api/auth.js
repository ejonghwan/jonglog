import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import auth from '../../middleware/auth.js'
import config from '../../config/index.js'

const { JWT_SECRET } = config


//model
import User from '../../models/user.js';
import Category from '../../models/category.js'

const router = express.Router();



// @routes   POST api/auth
// @desc     Auth user login
// @access   public
router.post('/', (req, res) => {
    const { email, password } = req.body;

    // validation
    if(!email || !password) {
        return res.status(400).json({ message: "모든 값을 채워주세요" });
    }

    //check user
    User.findOne({ email: email }).then( user => {
        if(!user) return res.status(400).json({ message: "유저가 없음" });

        //유저가 있다면 패스워드 검증
        bcrypt.compare(password, user.password).then( isMatch => { //첫번째는 유저가 입력한 것. 두번째는 디비에서 찾은거 //컴페어값은 불린
            if(!isMatch) return res.status(400).json({ message: "비밀번호 불일치" })

            // jwt return
            jwt.sign({ id:user.id }, JWT_SECRET, { expiresIn: "2 days" }, (err, token) => {
                if(err) throw err;
                res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    }
                })
            })

        })
    })

});


// @routes   POST api/logout
// @desc     logout user
// @access   public
router.post('/logout', (req, res) => {
    res.json("로그아웃")
})


// @routes   POST api/auth/user
// @desc     load user
// @access   public
router.get('/user', auth, async(req, res) => {
    try{
        const categoryFindResult = await Category.find()
        const user = await User.findById(req.user.id).select("-password") //select는 빼줌
        if(!user) throw Error("유저가 존재하지않음");
        // console.log('카테고리 가져오기 뭐가 나옴 ? ', categoryFindResult)
        // res.status(201).json(user)
        const result = {user, categoryFindResult}
        res.status(201).json(result)

    } catch(err) {
        console.log(err);
        res.status(400).json({ message: err.message })
    }
})

export default router;
