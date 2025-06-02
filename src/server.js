const express = require('express');
const bodyParser = require('body-parser')
const testConnection = require('./config/connectDB')
const {createJWT, verifyToken} = require('./middlewares/JWTaction')
const cookieParser = require('cookie-parser')
require('dotenv').config();

const cors = require('cors')

const app = express();
const port = process.env.PORT || 8000;
const configViewEngine = require('./config/viewEngine')
const router = require('./routers/web');
const apiRouter = require('./routers/api')
//config cros
app.use(cors({
  origin: process.env.REACT_URL || 'http://localhost:3000', // URL frontend
  credentials: true // Cho phép gửi cookie
}))



// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', process.env.REACT_URL);
//   res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, PATCH, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.header('Access-Control-Allow-Credentials', true);
//   return next();
// });

// config request req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//config cokie parse
app.use(cookieParser())

// test connection
// testConnection()

// test jwt
// let token = createJWT()
// let decodeData = verifyToken(token)

// middleware
// app.use((req, res, next) => {
//         // Cookies that have not been signed
//         console.log('Cookies: ', req.cookies)
//         // Cookies that have been signed
//         console.log('Signed Cookies: ', req.signedCookies)

//   next()
// })

//show router
configViewEngine(app)
app.use('/', router);
app.use('/api/v1/', apiRouter);

app.use((req, res) => {
  return res.send('404 not pount')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
