const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true, // 공백이 추가되었을때 없애주는 역할
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
})

userSchema.pre('save', function (next) { // save하기전에 해라
  var user = this;

  if (user.isModified('password')) {
    // 비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err); // next는 그 다음으로 index.js에서 save를 의미

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
})

userSchema.methods.comparePassword = function (plainPassword, cb) {

  // plainPassword 1234567      암호화된 비밀번호 $2b$10$DY9FhXG/DUbunaMG02K79uQ4
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
}

userSchema.methods.generateToken = function (cb) {

  var user = this;

  // jsonwebtoken을 이용해서 token을 생성하기
  var token = jwt.sign(user._id.toHexString(), 'secretToken');
  // user._id + 'secretToken' => token 생성
  // 'secretToken' => id 알아낼 수 있음

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
}

userSchema.statics.findByToken = function(token, cb) {
  var user = this;

  // 토큰을 decode 한다.
  jwt.verify(token, 'secretToken', function(err, decoded) {
    // 유저 아이디를 이용해 유저를 찾은 다음에
    // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

    user.findOne({"_id": decoded, "token": token}, function(err, user) {
      if(err) return cb(err);
      cb(null, user);
    });
  });

};

const User = mongoose.model('User', userSchema);

module.exports = { User }