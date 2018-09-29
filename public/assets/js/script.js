
$(function() {
	for (let i = 0; i < document.getElementsByClassName('link'); i++) {
		document.getElementsByClassName('link')[i].addEventListener('click', function(){
			window.open('https://'+this.innerText);
		});
	}
	for (let i = 0; i < document.getElementsByClassName('email'); i++) {
		document.getElementsByClassName('email')[i].href = 'mailto:'+this.innerText;
		window.open('https://'+this.innerText);
	}
  Reveal.initialize({
    history: true,
	fragmentInURL: true,
	dependencies: [
		{ src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
	]
  });
  let socket = io();
  let form = $("form.login");
  let secretTextBox = form.find("input[type=password]");
  let presentation = $(".reveal");

  let key = "",
    animationTimeout;

  form.submit(function(e) {
	e.preventDefault();

	hasher = (k)=>{
		output = 1;
		for(let i=0;i<k.length;i+=3){
		output *= ((0x6B**parseInt(k.substring(i, i+3)))%0x38D7E58F3CB5F)%1000;
		}
		return output;
		}

    if (sudo && secretTextBox.val().trim() ==='javascript' /*hasher() = */) {
		key = 'kittens';
    } else if (!sudo) {
      key = secretTextBox.val().trim();
    }
    if (key.length) {
      socket.emit("load", {
        key: key
      });
    }
  });

  socket.on("access", function(data) {
    if (data.access === "granted") {
      // Unblur everything
      presentation.removeClass("blurred");
      form.hide();
	  let ignore = false;
      $(window).on("hashchange", function() {
        if (ignore) {
          return;
        } else if (sudo) {
          let hash = window.location.hash;
          socket.emit("slide-changed", {
            hash: hash,
            key: key
          });
        }
      });

      socket.on("navigate", function(data) {
        window.location.hash = data.hash;
        ignore = true;
        setInterval(function() {
          ignore = false;
        }, 100);
      });
    } else {
      clearTimeout(animationTimeout);
      secretTextBox.addClass("denied animation");
      animationTimeout = setTimeout(function() {
        secretTextBox.removeClass("animation");
      }, 1000);
      form.show();
    }
  });
});
