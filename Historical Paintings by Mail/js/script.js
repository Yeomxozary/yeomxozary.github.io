function show() {
    document.getElementById("sidebar-menu").style.width = "350px";
}

function hide() {
    document.getElementById("sidebar-menu").style.width = "0";
}


var counter = 1;
setInterval(function(){
	document.getElementById('radio' + counter).checked = true;
	counter++;
	if(counter > 3) {
		counter = 1; 
	}
},5000);

