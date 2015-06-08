/**
 * Created by biankai on 15/6/6.
 */
var express = require('express'),
	app = express();

var port = process.env.PORT || 7203;

app.get('/', function (req, res) {
	res.send('Hello world 21111 ');
});

app.listen(port);