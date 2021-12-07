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