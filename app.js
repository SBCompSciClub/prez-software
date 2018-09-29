
const express = require('express'),
      app = express(),
      port = process.env.PORT || 8081,
	  io = require('socket.io').listen(app.listen(port));

app.get('/adv/controler/:dynamicroute', function(req,res) {
	res.sendFile(`${__dirname}/public/slides/advanced/day${req.params.dynamicroute}/controls.html`);
});
app.get('/adv/:dynamicroute', function(req,res) {
	res.sendFile(`${__dirname}/public/slides/advanced/day${req.params.dynamicroute}/viewer.html`);
});
app.get('/adv/sudo/:dynamicroute', function(req,res) {
	res.sendFile(`${__dirname}/public/slides/advanced/day${req.params.dynamicroute}/index.html`);
});
app.get('/beg/controler/:dynamicroute', function(req,res) {
	res.sendFile(`${__dirname}/public/slides/beginners/day${req.params.dynamicroute}/controls.html`);
});
app.get('/beg/:dynamicroute', function(req,res) {
	res.sendFile(`${__dirname}/public/slides/beginners/day${req.params.dynamicroute}/viewer.html`);
});
app.get('/beg/sudo/:dynamicroute', function(req,res) {
	res.sendFile(`${__dirname}/public/slides/beginners/day${req.params.dynamicroute}/index.html`);
});


//path temp fixes
app.get('/css/print/pdf.css', (req, res) => {
	res.sendFile(`${__dirname}/public/assets/css/print/pdf.css`);
});
app.get('/beg/sudo/plugin/highlight/highlight.js', (req, res) => {
	res.sendFile(`${__dirname}/public/assets/revealjs/plugin/highlight/highlight.js`);
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