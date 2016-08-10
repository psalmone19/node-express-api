var express = require('express')

var app = express()// creating an express app
var path = require('path')
var PORT = 3000
var middleWear = require('./middleWear')


// This middleWear is now for the whole app!
app.use(middleWear.requireAuthentication)

app.get('/', function(req, res){
  res.send('<h1>Express To-do API</h1>')
})

app.get('/about', middleWear.logger, function(req, res){
  res.send('<h1>Express About Page</h1>')
})

app.listen(PORT, function(){
  console.log(`Listening on PORT ${PORT}`)
})
