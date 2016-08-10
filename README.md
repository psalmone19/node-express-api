#Express-App-API-TODO
#### RESTFUL API

// This is a custom middleWear 

```
var middleWear = {
  requireAuthentication: function(req, res, next){
    console.log('Request Auth Ran')
    next()
  },
  logger: function(req, res, next){
    console.log(req.method + req.originalURL + new Date().toString())
  }
}
```
************************************************

// We utilized requireAuthentication

// This will be used at every request, bc it's global

```javascript
app.use(middleWear.requireAuthentication)
app.get('/', function(req, res){
  res.send('<h1>Express To-do API</h1>')
})
```

// The middleWear logger is local, because it's being used as a second parameter inside the get method.
```javascript
app.get('/about', middleWear.logger, function(req, res){
    res.send('<h1>Express About Page</h1>')
})
```

************************************************
// Why do we move code and export it and require it?

// Touched a new file called middlewear.js and moved the custom middlewear there, which I then exported and required in the server.js.

// npm installed body-parser `npm install body-parser --save` and required it in server.js, using it globally with `app.use(bodyParser`).

// Created 1st GET /todos & tested it with POSTMAN by creating Collection->Environment->Route in POSTMAN.

// Created 2nd GET /todos/:id & tested it with POSTMAN & also pushed to HEROKU and created Environment->Route

```javascript
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
```

// Created POST /todos
First, had to initialize id. The todoNextId is an initializer
`var todoNextId = 1`
And then required body with `req.body` which I stored in a variable 'body'.
And then I called the body.id and set it equal to 'todoNextId', which I iterated with `todoNextId++`. And then pushed that new object to the current 'todos' array with `todos.push(body)`.


************************************************
// REFACTOR using UnderScore.JS
    //GET TODOS/:id
    // the _.findWhere function looks throuhg the array and finds first value that matches key-value pair.
```javascript
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
```

    //POST
    // Used _.pick UnderScore function to filter out anything that isn't the keys 'description' or 'completed'

 ```javascript
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
 ```

//Create DELETE /TODOS/:id
//This is the delete verb. If it does not find the ID you're trying to delete, it will return a 404 error. But if it does find a id, it will delete it, and will return that object you have deleted.

```javascript
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
```



















