const express = require('express')
const app = express()
const port = 5000

// mongoDB를 쉽게 쓸 수 있게 해주는 tool
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:admin@boiler-plate.8h0lc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세여!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})