import jwt from 'jsonwebtoken';
import config from '../config/index.js';


const { JWT_SECRET } = config;

const auth = (req, res, next) => {
    const token = req.header('x-auth-token') //토큰값은 해더에 저장되어있음.
    console.log('token???: ',  token)
    if(!token) {
        return res.status(401).json({ message: "토큰없음 인증거부" })
    }

    try {
        //토큰 해석
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next() 
    } catch(err) {
        console.log(err)
        res.status(400).json({ message: "토큰값이 유료하지않음" })
    }
}


export default auth;