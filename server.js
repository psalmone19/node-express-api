var express = require('express')
var app = express()// creating an express app
var path = require('path')
var bodyParser = require('body-parser')
var PORT = process.env.PORT || 3000;
var middleWear = require('./middleWear')
var _ = require('underscore')

var todos = [
  // {
  //   id: 1,
  //   description: 'Teach REST API.',
  //   completed: false
  // },
  // {
  //   id: 2,
  //   description: 'Go eat a healthy lunch.',
  //   completed: true
  // }
]

var todoNextId = 1;

// This middleWear is now for the whole app!
app.use(middleWear.requireAuthentication)
app.use(bodyParser())

app.get('/', function(req, res){
  res.send('<h1>Express To-do API</h1>')
})

app.get('/todos', function(req, res){
  res.json(todos)
})

app.get('/todos/:id', function(req, res){
// creating a variable that will hold id from params object
  var todoId = parseInt(req.params.id)
  // findWhere finds the first value that matches the key-value pair
  var matchedTodo = _.findWhere(todos, {id: todoId})
    if(matchedTodo) {
      res.json(matchedTodo)
    } else {
      res.status(404).send()
    }
})

app.post('/todos', function (req, res){
  var body = _.pick(req.body, 'description', 'completed')
  // _.isBoolean & _.isString are Object functions that allows us to validate. We have the body object through body-parser.
  if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
    return res.status(400).send()
  }
    body.description = body.description.trim()
    body.id = todoNextId
    todoNextId++
    todos.push(body)
  // console.log('description ' + body.description)
  res.json(body)
})

app.delete('/todos/:id', function(req, res){
  var todoId = parseInt(req.params.id)
  var matchedTodo = _.findWhere(todos, {id: todoId})
  if(!matchedTodo) {
    res.status(404).json({"error": "No Todo found."})
  } else {
    todos = _.without(todos, matchedTodo)
  }
  res.json(matchedTodo)
})

app.get('/about', middleWear.logger, function(req, res){
  res.send('<h1>Express About Page</h1>')
})

app.listen(PORT, function(){
  console.log(`Listening on PORT ${PORT}`)
})
