const express = require('express');
const app = express();
const port = 5000;

const config = require('./config/key');

const bodyParser = require("body-parser");
const { User } = require("./models/User"); 

// bodyParser 옵션값을 줘야함
app.use(bodyParser.urlencoded({extended: true})); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json


// mongoDB를 쉽게 쓸 수 있게 해주는 tool
const mongoose = require('mongoose');
mongoose.set('strictQuery',false);
mongoose.connect(config.mongoURI, {
  
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요!')
});

// 회원가입을 위한 라우트
app.post('/register', (req, res) => {
  // 회원가입할때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body); // bodyParser가 있어서 req.body로 쓸 수 있음

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    })
  });  // mongoDB에서 오는 메소드
   
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});