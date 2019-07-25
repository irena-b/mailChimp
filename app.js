const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const request = require('request');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/signup.html');
})

app.post('/', function(req, res){
    // console.log(req.body)
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    console.log(firstName, lastName, email)


});

app.listen(3000, function(){
    console.log('server is running on port 3000')
})