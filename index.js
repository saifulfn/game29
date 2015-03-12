var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

mongoose.connect('mongodb://localhost/29');
require('./models/RoomModel');
require('./initServer.js');

app.use('/', express.static(__dirname + "/public"));
//app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);

app.use(session({
    secret: 'cookie_secret',
    name: 'cookie_name',
    //store: sessionStore, // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

var sess;

app.get('/', function (req, res) {
    sess = req.session;
    //Session set when user Request our app via URL
    //console.log(sess.name);
    if (sess.name) {
        /*var hour = 3600000;
        req.session.cookie.expires = new Date(Date.now() + hour);
        req.session.cookie.maxAge = hour;*/

        /*
         * This line check Session existence.
         * If it existed will do some action.
         */
        res.redirect('/lobby');
    }
    else {
        res.render('index.html');
    }
});

app.post('/login', function (req, res) {
    sess = req.session;
//In this we are assigning name to sess.name variable.
//name comes from HTML page.
    sess.name = req.body.name;
    res.end('done');
});

app.get('/lobby', function (req, res) {
    sess = req.session;
    if (sess.name) {
        //res.write('<h1> Hello ' + sess.name + ' </h1>');
        //res.end('<a href="/logout">Logout</a>');
        res.render("lobby/index.html", {name: sess.name});
    }
    else {
        res.write('<h1> Please login first. </h1>');
        res.end('<a href="/">Login</a>');
    }
});
app.get('/room', function(req, res){
    var sess = req.session;
    if (sess.name) {
        //res.write('<h1> Hello ' + sess.name + ' </h1>');
        //res.end('<a href="/logout">Logout</a>');
        //res.render("room/index.html", {name: sess.name});
        res.render("room/index.html", {name:sess.name, roomTitle:sess.roomTitle});
    }
    else {
        res.write('<h1> Please login first. </h1>');
        res.end('<a href="/">Login</a>');
    }
    //res.render('/room/index.html', {name:sess.name, roomTitle:sess.roomTitle});
});

app.get('/game', function(req, res){
    var sess = req.session;
    res.render("game/index.html", {name:sess.name, roomTitle:sess.roomTitle});
    /*
    if (!sess.name) {
        //res.write('<h1> Hello ' + sess.name + ' </h1>');
        //res.end('<a href="/logout">Logout</a>');
        //res.render("room/index.html", {name: sess.name});

    }
    else {
        res.write('<h1> Please login first. </h1>');
        res.end('<a href="/">Login</a>');
    }*/
    //res.render('/room/index.html', {name:sess.name, roomTitle:sess.roomTitle});
});

app.get('/logout', function (req, res) {

    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });

});
require('./routes/lobbyRoute')(app);
app.listen(80, function () {
    console.log("App Started on PORT 80");
});