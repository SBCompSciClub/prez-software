$(function() {

	Reveal.initialize({
		history: true
	});

	let socket = io();
	let form = $('form.login');
	let secretTextBox = form.find('input[type=text]');
	let presentation = $('.reveal');

	let key = "", animationTimeout;

	form.submit(function(e){

		e.preventDefault();

		key = secretTextBox.val().trim();

		if(key.length) {
			socket.emit('load', {
				key: key
			});
		}

	});


	socket.on('access', function(data){


		if(data.access === "granted") {

			// Unblur everything
			presentation.removeClass('blurred');

			form.hide();

			let ignore = false;

			$(window).on('hashchange', function(){

				if(ignore){
					return;
				} else if(sudo){
					let hash = window.location.hash;
					//changesslide to current every one sec
					setInterval(function(){
						socket.emit('slide-changed', {
							hash: hash,
							key: key
						});
					},1000)
				}
			});

			socket.on('navigate', function(data){
				window.location.hash = data.hash;
				ignore = true;
				setInterval(function () {
					ignore = false;
				},100);
			});

		}
		else {

			clearTimeout(animationTimeout);
			secretTextBox.addClass('denied animation');
			animationTimeout = setTimeout(function(){
				secretTextBox.removeClass('animation');
			}, 1000);

			form.show();
		}

	});

});