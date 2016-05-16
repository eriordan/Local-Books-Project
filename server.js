var express = require('express'),
    config = require('./server/configure'),
    app = express();
    mongoose = require('mongoose');
	app.set('port', process.env.PORT || 3300);
	app.set('views', __dirname + '/views');
	app = config(app);

	mongoose.connect('mongodb://lbooks:localbookstore2016.mlab.com:23442/localbooks');
	mongoose.connection.on('open',function(){
		console.log('Mongoose connected.');
	})



// Redundant code now that the as used in the early stages to test the server was working.
	//app.get('/',function(req, res){
	//res.send('Hello World');
	//});
var server = app.listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
	});

