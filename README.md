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
```
app.use(middleWear.requireAuthentication)
app.get('/', function(req, res){
  res.send('<h1>Express To-do API</h1>')
})
```

// The middleWear logger is local, because it's being used as a second parameter inside the get method.
```
app.get('/about', middleWear.logger, function(req, res){
    res.send('<h1>Express About Page</h1>')
})
```

************************************************
// Why do we move code and export it and require it?

// Touched a new file called middlewear.js and moved the custom middlewear there, which I then exported and required in the server.js.

// npm installed body-parser `npm install body-parser --save` and required it in server.js, using it globally with `app.use(bodyParser`).

// Created 1st GET /todos & tested it with POSTMAN by creating Collection->Environment->Route in POSTMAN.











