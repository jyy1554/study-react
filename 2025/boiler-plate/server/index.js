const express = require('express');
const app = express();
const config = require('./config/key');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");
const { User } = require("./models/User");

// bodyParser 옵션값을 줘야함
app.use(bodyParser.urlencoded({extended: true})); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json
app.use(cookieParser());


// mongoDB를 쉽게 쓸 수 있게 해주는 tool
const mongoose = require('mongoose');
mongoose.set('strictQuery',false);
mongoose.connect(config.mongoURI, {

})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요!');
});

app.get('/hello', (req, res) => {
  res.send("안녕하세요");
});


// 회원가입을 위한 라우트
app.post('/users/register', (req, res) => {
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

 
// 로그인하기
app.post('/users/login', (req, res) => {
  // 요청한 이메일이 데이터베이스에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    // 요청한 이메일이 데이터베이스에 있다면, 비밀번호가 맞는 비밀번호인지 확인한다.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }

      // 비밀번호까지 맞다면 토큰 생성하기
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
        res.cookie("x_auth", user.token)
        .status(200)
        .json({
          loginSuccess: true,
          userId : user._id,
        });
      });
    });
  });
});


// auth router
app.get('/users/auth', auth, (req, res) => {  // auth는 미들웨어

  // 여기까지 미들웨어를 통과해왔다는 얘기는 Authentication이 True라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  });
});


// 로그아웃
app.get('/users/logout', auth, (req, res) => {

  User.findOneAndUpdate({ _id: req.user._id },{
    token: ""
  }, (err, user) => {
    if(err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true
    });
  });
})


const port = 5000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});