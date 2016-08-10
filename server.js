var express = require('express')
var app = express()// creating an express app
var path = require('path')
var bodyParser = require('body-parser')
var PORT = process.env.PORT || 3000;
var middleWear = require('./middleWear')

var todos = [
  {
    id: 1,
    description: 'Teach REST API.',
    completed: false
  },
  {
    id: 2,
    description: 'Go eat a healthy lunch.',
    completed: true
  }
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
  var matchedTodo;
  todos.forEach(function(todo){
    if(todoId === todo.id) {
      matchedTodo = todo
    }
  })
    if(matchedTodo) {
      res.json(matchedTodo)
    } else {
      res.status(404).send()
    }
})

app.post('/todos', function (req, res){
  var body = req.body
    body.id = todoNextId
    todoNextId++
    todos.push(body)
  // console.log('description ' + body.description)
  res.json(body)
})

app.get('/about', middleWear.logger, function(req, res){
  res.send('<h1>Express About Page</h1>')
})

app.listen(PORT, function(){
  console.log(`Listening on PORT ${PORT}`)
})
