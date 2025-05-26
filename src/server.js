const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser')
const testConnection = require('./config/connectDB')
var cors = require('cors')

const app = express();
const port = process.env.PORT || 8000;
const configViewEngine = require('./config/viewEngine')
const router = require('./routers/web');
const apiRouter = require('./routers/api')
app.use(cors())
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

// test connection
testConnection()

//show router
configViewEngine(app)
app.use('/', router);
app.use('/api/v1/', apiRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
