import app from './app.js'
import config from './config/index.js'


const { PORT } = config; 

// app.listen(PORT, (req, res, next) => {
//     console.log(`port: ${PORT}`)
// })


app.listen(3000, (req, res, next) => {
    console.log(`port: 3000`)
})