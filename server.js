var path = require("path")
var express = require("express")
var logger = require("morgan")
var bodyParser = require("body-parser") // simplifies access to request body

var app = express()  // make express app
var http = require('http').Server(app)  // inject app into the server

// 1 set up the view engine
app.set("views", path.resolve(__dirname, 'assets/')); // path to views
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html'); 

// 2 create an array to manage our entries
var entries = []
app.locals.entries = entries // now entries can be accessed in .ejs files

app.use(express.static(__dirname + '/assets'))
// 3 set up an http request logger to log every request automagically
app.use(logger("dev"))     // app.use() establishes middleware functions
app.use(bodyParser.urlencoded({ extended: false }))

// 4 handle http GET requests (default & /new-entry)
app.get("/", function (request, response) {
    response.render("index.html")
})

app.get("/AboutMe", function (request, response) {
    response.render("AboutMe.html")
})

app.get("/Contact", function (request, response) {
    response.render("Contact.html")
})

app.post("/Contact", function (req, res) {
    var api_key = 'key-a749eb470e6fe9a7b30cca0c1acdfb0d';
    var domain = 'sandbox9778769e39b74388bf8cd6a3c015d18a.mailgun.org';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
     
    var data = {
      from: 'Mail Gun <postmaster@sandbox9778769e39b74388bf8cd6a3c015d18a.mailgun.org>',
      to: req.body.emailid,
      subject: 'Greating from Kishan',
      text: 'Hello ' + req.body.firstname + '\nThank you for visiting the website, I will get back to you asap'
    };
     
    mailgun.messages().send(data, function (error, body) {
      console.log(body);
    });
})

app.get("/KnowYourPast", function (request, response) {
    response.render("KnowYourPast.html")
})

app.get("/guestbook", function (request, response) {
    response.render("guestbook.html", {entries : entries})
})

app.get("/new-entry", function (request, response) {
    response.render("new-entry")
})
// 5 handle an http POST request to the new-entry URI
app.post("/new-entry", function (request, response) {
    if (!request.body.title || !request.body.body) {
        response.status(400).send("Entries must have a title and a body.")
        return
    }
    entries.push({ // store it
        title: request.body.title,
        content: request.body.body,
        published: new Date()
    })
    response.redirect("/guestbook") // where to go next? Let's go to the home page :)
})
// if we get a 404 status, render our 404.ejs view
app.use(function (request, response) {
    response.status(404).render("404")
})
//Listen for an application request on port 8081 & notify the developer
app.listen(8081, function () {
console.log('Guestbook app listening on http://127.0.0.1:8081/')
})