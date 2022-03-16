window.vm = new Scratch.vm();
window.file = document.getElementById("files");
const storage = new Scratch.storage();
let cvs = document.getElementById("canvas");
const render = new Scratch.render(cvs);
const audio = new Scratch.audio();
const svgRenderer = Scratch.svgRender;
//loading screen (when finished)
vm.runtime.emitProjectLoaded = function () {
    document.getElementById('loadingScreen').hidden = true;
}
//add loading screen
document.getElementById('loadingScreen').hidden = true;
vm.attachStorage(storage);
vm.attachRenderer(render);
vm.attachV2BitmapAdapter(svgRenderer);
vm.attachAudioEngine(audio);
vm.setCompatibilityMode(true);
vm.start();
file.onchange = function () {
	var reader = new FileReader();
	reader.onload = function () {
		var bytes = new Uint8Array(reader.result);
		document.getElementById('loadingScreen').hidden = false;
		vm.loadProject(bytes);
	}
	if (file.files[0]) {
		reader.readAsArrayBuffer(file.files[0]);
	}
	file.innerHTML = "";
}
//keyboard controls
function resiterKey(keyid,isdown) {
	//send if the key is down
	//example keyid: "ArrowRight"
	//vm is scratch-vm
	vm.postIOData('keyboard',{key:keyid,isDown:isdown});
}
let shiftkey = false;
document.onkeydown = function (e) {
	if (e.key == "Shift") {
		shiftkey = true;
	}
	resiterKey(e.key,true);
}
document.onkeyup = function (e) {
	if (e.key == "Shift") {
		shiftkey = false;
	}
	resiterKey(e.key,false);
}
//mouse controls
cvs = document.getElementById("canvas"); //we will be using it soon
window.onmousedown = function(e) {
	mousedata.down=true;
}
window.onmouseup = function(e) {
	mousedata.down=false;
}
window.mousedata = {x:0,y:0,down:false};
function sendMouse(event) {
    try{const { x, y } = mousedata
	var rect = cvs.getBoundingClientRect();
    const mousePosition = { x: x - rect.left, y: y - rect.top }
    vm.postIOData('mouse', {
      isDown:mousedata["down"],
      ...mousePosition,
      canvasWidth: rect.width,
      canvasHeight: rect.height
    })}catch(e){
		//try again when function called
		//if throws an error then ignore (this fixes most bugs.)
	};
	setTimeout(sendMouse,1);
	return ;
}
setTimeout(sendMouse,1);
document.body.onmousemove = function (e) {
	mousedata={x:e.x,y:e.y};
}
var isFullscreen = false;
function fullscreenmode() {
	if (isFullscreen) {
		isFullscreen = false;
	} else {
		isFullscreen = true;
	}
}
//make element fullscreen when entering fullscreen mode
var Scale = 1;

function checkFullscreen() {
	if (isFullscreen) {
		Scale = window.innerHeight/360;
		document.getElementById('questionBox').setAttribute("class","questionBoxFull");
	} else {
		Scale = 1;
		document.getElementById('questionBox').setAttribute("class","questionBox");
	}
	var i = 0;
	while (document.body.children.length > i) {
		document.body.children[i].hidden = isFullscreen;
		document.getElementById('scratch-container').hidden = false;
		document.getElementById('fsmode').hidden = false;
		i += 1;
	}
	cvs.style.width = Scale*480+"px";
	cvs.style.height = Scale*360+"px";
	cvs.style.marginLeft = (Scale*480)/-2+"px";
	cvs.style.marginTop = (Scale*360)/-2+"px";
	setTimeout(checkFullscreen,1);
}
setTimeout(checkFullscreen,1);
//what to do when the program extucutes a ask and wait block
let questionBox = document.getElementById("questionBox");
vm.runtime.addListener('QUESTION', questionData => {
	if (!(questionData === null)) {
		questionBox.hidden = false;
		questionBox.children[0].value = ""; //make the box empty
		questionBox.children[0].focus(); //make it focused
	} else {
		//returns null when something else cancels it.
		questionBox.hidden = true;
	}
})
function hidebox() {
	//hide the box because we do not need it anymore.
	questionBox.hidden = true;
	//send the info to the vm.
	vm.runtime.emit('ANSWER', questionBox.children[0].value);
}
questionBox.children[1].onclick = hidebox;
questionBox.children[0].onkeydown = function (e) {
	if (e.key == "Enter") {
		hidebox(); //makes it so when the user presses enter it will submit it.
	}
}

/*//online
var wsUrl = 'ws://tangible-thorn-neighbor.glitch.me';
var ws = new WebSocket(wsUrl);
var cloudVars = [];
var wsConnected = false;
ws.onmessage = function (e) {
	cloudVars = JSON.parse(e.data);
	console.log("Server data changed!");
}
function tickserver() {
	ws.onclose = function () {
		ws = new WebSocket(wsUrl);
		console.log("Server closed! retrying to connect...");
		wsConnected = false;
		ws.onmessage = function (e) {
			cloudVars = JSON.parse(e.data);
			console.log("Server data changed!");
		}
	}
	ws.onopen = function () {
		console.log("Server connected!");
		wsConnected = true;
	}
	setTimeout(tickserver,1);
}
function updateCloud() {
	if (wsConnected) {
		ws.send(JSON.stringify(cloudVars));
	} else {
		console.warn("The server has not connected yet, so nothing got sent.");
	}
}
var cl
function tickdata() {
	cloudProvider = {
		requestCloseConnection:function () {
			cloudVars = [];
			ws.close();
		},
		updateVariable: function (name,data) {
			
			cloudVars[name] = data;
			updateCloud()
		},
		createVariable: function (name,data) {
			cloudVars[name] = data;
			updateCloud()
		},
		renameVariable: function (oldname,newname) {
			cloudVars[newname] = cloudVars[oldname];
			cloudVars[oldname] = 0;
			updateCloud()
		},
		parseMessage (name) {
			return cloudVars[name];
		}
		
	}
	vm.setCloudProvider(cloudProvider);
}
setTimeout(tickserver,1);
setTimeout(tickdata,1);*/ //unused cloud script (does not work)