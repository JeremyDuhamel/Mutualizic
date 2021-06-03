var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = '2976cbb040c84a7bba51d2d3dde5a882'; // Your client id
var client_secret = '0c1d1d36f80e423f8b8c707d91b1905b'; // Your secret
var redirect_uri = './main.html'; // Your redirect uri
var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname))
   .use(cors())
   .use(cookieParser());

app.get('/login', function(req, res) {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
        }));
});