
const express = require('express'),
      app = express(),
      port = process.env.PORT || 8081,
	  io = require('socket.io').listen(app.listen(port));

app.get('/controler', (req, res) => {
	res.sendFile(`${__dirname}/public/controls.html`);
});
app.get('/slides/:dynamicroute', function(req,res) {
	res.sendFile(`${__dirname}/public/slides/day${req.params.dynamicroute}/viewer.html`);
});
app.get('/slides/sudo/:dynamicroute', function(req,res) {
	res.sendFile(`${__dirname}/public/slides/day${req.params.dynamicroute}/index.html`);
});

//path temp fixes
app.get('/css/print/pdf.css', (req, res) => {
	res.sendFile(`${__dirname}/public/assets/css/print/pdf.css`);
});

app.use(express.static(__dirname + '/public'));

//the password
let secret = 'kittens';

let presentation = io.on('connection', function (socket) {

	socket.on('load', function(data){
		socket.emit('access', {
			access: (data.key === secret ? "granted" : "denied")
		});

	});


	socket.on('slide-changed', function(data){
		if(data.key === secret) {
			presentation.emit('navigate', {
				hash: data.hash
			});
		}

	});

});

console.log('Your presentation is running on http://localhost:' + port);