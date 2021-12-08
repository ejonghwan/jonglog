import express from 'express';
import mongoose from 'mongoose';
import config from './config/index.js';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';


// routes
import postsRoutes from './routes/api/posts.js'
import userRoutes from './routes/api/user.js'
import authRoutes from './routes/api/auth.js'
import searchRoutes from './routes/api/search.js'

const app = express()
const { DB_INFO } = config

app.use(hpp());
app.use(helmet());

app.use(cors({ origin: true, credentials: true, })); // origin은 모두 허용, credentials는 브라우저 해더에 콜스 설정 
app.use(morgan("dev")) //개발환경에서 로그 볼 수 있는 미들웨어
app.use(express.json()) //bodyparser 대신 


// 리다이렉트 테스트한거 front쪽은 router page에 있음 헷갈리지 말자 
// app.post('/test/hoho', async (req, res) => {
//     try{
            // req.query  - front 에서 get 방식으로 보내온 거
            // req.body - front 에서 post로 보내온거 
//         // const reqGet = req.get() //get은 뭐자 ㅜㅜ;;
//         const reqHeader = req.header("hohohehehe") // - 리퀘스트 해더에 실어온 값 
//         // console.log('앱에 레큐디', req.body)
//         console.log('앱에 해더어어어어어', reqHeader)
//         // res.redirect(`/test/hoho/${req.body.name}`) 
//         res.json({ pay: req.body.name })
//     } catch(err) {console.log(err)}
// })


// 몽고디비 연결
mongoose.connect(DB_INFO, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
}).then(() => {
    console.log("mongodb connecting success")
}).catch((err) => {
    console.log('몽고디비 에러: ', err)
})


// routes
// app.get('/')
app.use('/api/post', postsRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/search', searchRoutes)

export default app;