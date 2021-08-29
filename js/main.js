const firebaseConfig = {
  apiKey: "AIzaSyCodGBYdwn382QLxw5JLeHV3BXsua2ekGM",
  authDomain: "ssaccountmanager.firebaseapp.com",
  databaseURL: "https://ssaccountmanager-default-rtdb.firebaseio.com",
  projectId: "ssaccountmanager",
  storageBucket: "ssaccountmanager.appspot.com",
  messagingSenderId: "466168946177",
  appId: "1:466168946177:web:9eac116d7ad70a8c19aa00"
};
firebase.initializeApp(firebaseConfig);

//window.location = "https://smartspider47.github.io/ss-account-manager/";

function haveSpace (str) {
	for (var i = 0; i < str.length; i++) {
		if (str[i] == ' ') {
			return true;
		}
	}
	return false;
}

document.getElementById("id_btn_sin").onclick = function () {
	
	var cname = document.getElementById("id_sin_name").value;
	var cpass = document.getElementById("id_sin_pass").value;

	if (haveSpace(cname)) {
		alert("There should be no spaces in Account Name!");
		return;
	}

	if (haveSpace(cpass)) {
		alert("There should be no spaces in Password!");
		return;
	}

	if (cname.length < 1) {
		alert("Account Name should not be empty!");
		return;
	}

	if (cpass.length < 1) {
		alert("Password should not be empty!");
		return;
	}

	firebase.database().ref().child("users").child(cname).get().then((snapshot) => {
		if (snapshot.exists()) {
	    	
			var v = snapshot.val();

			if (cpass == v.password) {

				window.location = "page/main.html";

			}else {
				alert("Wrong Password!");
			}

	  	}else {

	  		alert("Account does not exist!");

	  	}
	}).catch((error) => {
		console.error(error);
	});

}


var ctx = document.querySelector("canvas").getContext("2d"),
    dashLen = 220, dashOffset = dashLen, speed = 30,
    txt = "Currency Converter", x = 30, i = 0;

ctx.font = "36px tajikan, cursive, TSCu_Comic, sans-serif"; 
ctx.lineWidth = 1; ctx.lineJoin = "round"; ctx.globalAlpha = 2/3;
ctx.strokeStyle = ctx.fillStyle = "white";

(function loop() {
  ctx.clearRect(x, 0, 60, 150);
  ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]); // create a long dash mask
  dashOffset -= speed;                                         // reduce dash length
  ctx.strokeText(txt[i], x, 90);                               // stroke letter

  if (dashOffset > 0) requestAnimationFrame(loop);             // animate
  else {
    ctx.fillText(txt[i], x, 90);                               // fill final letter
    dashOffset = dashLen;                                      // prep next char
    x += ctx.measureText(txt[i++]).width + ctx.lineWidth * Math.random();
    ctx.setTransform(1, 0, 0, 1, 0, 3 * Math.random());        // random y-delta
    ctx.rotate(Math.random() * 0.005);                         // random rotation
    if (i < txt.length) requestAnimationFrame(loop);
  }
})();