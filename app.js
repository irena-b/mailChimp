const { apiConfig } = require('./api.js')
var apiKey = apiConfig.apiConfig.MY_KEY;
// console.log(apiConfig);
// console.log(apiConfig.apiConfig.MY_KEY);




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
    // var apiKey = apiConfig.MY_KEY;
    var data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);
    // console.log(firstName, lastName, email)
    var options = {
        url: 'https://us20.api.mailchimp.com/3.0/lists/18fd322eb8',
        method: 'POST',
        headers: {
            'Authorization': `'changer ${apiKey}`,
        },
        body: jsonData,
    };
    request(options, function(error, response, body){
        if(error){
            // console.log(error);
            res.sendFile(__dirname + '/failure.html')
        } else {
            if(res.statusCode === 200){
                // console.log(response.statusCode);
                res.sendFile(__dirname + '/success.html')
            } else {
              res.sendFile(__dirname + '/failure.html')

            }
            

        }
    })

});
app.post('/failure', function(req, res){
    res.redirect('/');
})
app.listen(process.env.PORT || 3000, function(){
    console.log('server is running on port 3000')
})