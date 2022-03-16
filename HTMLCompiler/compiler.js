var url = 'https://jasonglenevans.github.io/GvbvdxxModLoader/main.js';
var storedText;
console.log("Fetching vm");
fetch(url,{mode:"cors"})
  .then(function(response) {
    response.text().then(function(text) {
		console.log("Vm loaded");
		getvm(text);
    });
  });
function getvm(vm) {
	window.downloadedMultiVm = vm;
}
var cons = document.getElementById("console");
file = document.getElementById("fileselect");
file.accept = ".sb3";
window.projectFile = null;
file.onchange = function () {
	var reader = new FileReader();
	reader.onload = function () {
		window.projectFile = reader.result.split("data:application/octet-stream;base64,").pop();
	}
	if (file.files[0]) {
		if (file.files[0].name.split(".").pop() == "sb3") {
			reader.readAsDataURL(file.files[0]);
		} else {
			window.alert("File is not a vailid scratch project file");
		}
	}
}
window.compilerIcon = "";
fileicon = document.getElementById("icon");
fileicon.accept = "image/*";
fileicon.onchange = function () {
	var reader = new FileReader();
	reader.onload = function () {
		window.compilerIcon = reader.result;
	}
	if (fileicon.files[0]) {
		reader.readAsDataURL(fileicon.files[0]);
	}
}
function log(text) {
	cons.innerHTML += text+"<br>";
	cons.scrollTo(0,10000000);
}
function compile(opts) {
	cons.innerHTML = "";
	var zip = new JSZip();
	log("geting data...");
	var bytes = new Uint8Array(window.projectFile);
	window.projectData = bytes;
	log("geting options...");
	var opt = opts;
	
	log(`Making folder "scratch"`);
	var img = zip.folder("scratch");
	log(`Making file "vm.js"`);
	img.file("vm.js", window.downloadedMultiVm, {base64: false});
	log(`Making file "project.sb3"`);
	img.file("project.sb3", window.projectFile, {base64: true});
	log(`Making file "index.html"`);
	var html = `<!DOCTYPE HTML>
<html>
	<!--Genarated by GvbvdxxMod2HTML-->
	<head>
		<title>`+opt.title+`</title>
		<link rel="icon" href="`+window.compilerIcon+`">
	</head>
	<body style="background-color:black;">
		<style>
			#canvas{
				width:100%;
				height:100%;
				position:absolute;
				top:0;
				left:0;
				image-rendering:pixelated; /*Make it look pixel sharp*/
			}
			.questionBoxFull {
				position:fixed;
				bottom:0;
				left:0;
				background-color:white;
				width:100%;
				height:40px;
				border-style:solid;
				border-width:1.7px;
				border-color:grey;
				border-radius:10px;
				z-index:1000;
			}
			#inputOfQuestion {
				margin-left:10px;
				float:left;
				height:35px;
				width:85%;
				border-style:solid;
				border-width:1.7px;
				border-color:grey;
				border-radius:10px;
			}
			#checkmark {
				width:40px;
				height:40px;
				float:right;
				margin-right:10px;
			}
			#checkmark:hover {
				filter:brightness(140%);
				cursor:pointer;
			}
		</style>
		<canvas id="canvas"></canvas>
		<div class="questionBoxFull" id="questionBox" hidden>
		<input type="text" placeholder="type something here..." id="inputOfQuestion">
		<img src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMS4yIiBoZWlnaHQ9IjIxLjIiIHZpZXdCb3g9IjAsMCwyMS4yLDIxLjIiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMjkuNCwtMTY5LjQpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjI5LjksMTgwYzAsLTUuNTc4MDggNC41MjE5MiwtMTAuMSAxMC4xLC0xMC4xYzUuNTc4MDgsMCAxMC4xLDQuNTIxOTIgMTAuMSwxMC4xYzAsNS41NzgwOCAtNC41MjE5MiwxMC4xIC0xMC4xLDEwLjFjLTUuNTc4MDgsMCAtMTAuMSwtNC41MjE5MiAtMTAuMSwtMTAuMXoiIGZpbGw9IiMwMDdkZmYiIHN0cm9rZT0iIzAwNjJiZCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMjM0Ljg5NTExLDE3OS45ODE3bDMuOTA5NTgsNC42MTA4N2w2LjMwMDIsLTkuMTg1MTQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPjwvZz48L3N2Zz4=" id="checkmark">
		</div>
<div
		style="
			position:fixed;
			top:0;
			left:0;
			width:100%;
			height:100vh;
			background-color:black;
			opacity:0.6;
			z-index:100px;
			cursor:pointer;
		"
		id="projectstarticon"
		hidden
		>
			<img style="
				position:fixed;
				top:50%;
				left:50%;
				margin-top:-60px;
				margin-left:-60px;
				cursor:pointer;
			" width=120 height=120 src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4NiIgaGVpZ2h0PSI4NiIgdmlld0JveD0iMCwwLDg2LDg2Ij48ZGVmcz48Y2xpcFBhdGggaWQ9ImNsaXAtMSI+PHBhdGggZD0iTTIxOSwyMDIuMDk4NnYtNDQuMTk3Mmg0MnY0NC4xOTcyeiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PC9jbGlwUGF0aD48L2RlZnM+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5NywtMTM3KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yMDAsMTgwYzAsLTIyLjA5MTQgMTcuOTA4NiwtNDAgNDAsLTQwdjBjMjIuMDkxNCwwIDQwLDE3LjkwODYgNDAsNDB2MGMwLDIyLjA5MTQgLTE3LjkwODYsNDAgLTQwLDQwdjBjLTIyLjA5MTQsMCAtNDAsLTE3LjkwODYgLTQwLC00MHoiIGZpbGwtb3BhY2l0eT0iMC43NSIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAtMSkiPjxwYXRoIGQ9Ik0yMjAuODk0MiwxNjIuOTUyNWMyLjgwNjYsLTIuMDg4OSA2LjIxMiwtMy4yMTcxIDkuNzEwNywtMy4yMTcxYzMuNDk4NywwIDYuOTA0MSwxLjEyODIgOS43MTA4LDMuMjE3MXYwYzIuODA2NiwyLjA4ODkgNi4yMTIxLDMuMjE3MSA5LjcxMDgsMy4yMTcxYzMuNDk4NiwwIDYuOTA0MSwtMS4xMjgyIDkuNzEwNywtMy4yMTcxdjI2LjI2NThjLTIuODA2NiwyLjA4ODkgLTYuMjEyMSwzLjIxNyAtOS43MTA3LDMuMjE3Yy0zLjQ5ODcsMCAtNi45MDQyLC0xLjEyODEgLTkuNzEwOCwtMy4yMTdjLTIuODA2NywtMi4wODg5IC02LjIxMjEsLTMuMjE3MSAtOS43MTA4LC0zLjIxNzFjLTMuNDk4NywwIC02LjkwNDEsMS4xMjgyIC05LjcxMDcsMy4yMTcxIiBmaWxsPSIjNGNiZjU2IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48cGF0aCBkPSJNMjIwLjg5NDIsMTYyLjk1MjVjMi44MDY2LC0yLjA4ODkgNi4yMTIsLTMuMjE3MSA5LjcxMDcsLTMuMjE3MWMzLjQ5ODcsMCA2LjkwNDEsMS4xMjgyIDkuNzEwOCwzLjIxNzF2MGMyLjgwNjYsMi4wODg5IDYuMjEyMSwzLjIxNzEgOS43MTA4LDMuMjE3MWMzLjQ5ODYsMCA2LjkwNDEsLTEuMTI4MiA5LjcxMDcsLTMuMjE3MXYyNi4yNjU4Yy0yLjgwNjYsMi4wODg5IC02LjIxMjEsMy4yMTcgLTkuNzEwNywzLjIxN2MtMy40OTg3LDAgLTYuOTA0MiwtMS4xMjgxIC05LjcxMDgsLTMuMjE3Yy0yLjgwNjcsLTIuMDg4OSAtNi4yMTIxLC0zLjIxNzEgLTkuNzEwOCwtMy4yMTcxYy0zLjQ5ODcsMCAtNi45MDQxLDEuMTI4MiAtOS43MTA3LDMuMjE3MSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDU5OTNkIiBzdHJva2Utd2lkdGg9IjIuNTI1NTYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yMjAuODk0MiwyMDAuMjA0NHYtNDAuNDA4OSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDU5OTNkIiBzdHJva2Utd2lkdGg9IjMuNzg4MzMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvZz48cGF0aCBkPSJNMjQwLDIyM2MtMjMuNzQ4MiwwIC00MywtMTkuMjUxOCAtNDMsLTQzaDZjMCwyMC40MzQ1IDE2LjU2NTUsMzcgMzcsMzd6TTI4MywxODBjMCwyMy43NDgyIC0xOS4yNTE4LDQzIC00Myw0M3YtNmMyMC40MzQ1LDAgMzcsLTE2LjU2NTUgMzcsLTM3ek0yNDAsMTM3YzIzLjc0ODIsMCA0MywxOS4yNTE4IDQzLDQzaC02YzAsLTIwLjQzNDUgLTE2LjU2NTUsLTM3IC0zNywtMzd6TTI0MCwxNDNjLTIwLjQzNDUsMCAtMzcsMTYuNTY1NSAtMzcsMzdoLTZjMCwtMjMuNzQ4MiAxOS4yNTE4LC00MyA0MywtNDN6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48L2c+PC9nPjwvc3ZnPg==">
		</div>
		<h1 style="
		position:fixed;
		top:50%;
		left:50%;
		width:100%;
		height:100vh;
		font-family:arial;
		font-size:50px;
		margin-top:30px;
		margin-left:-210px;
		color:white;
		" hidden id="loadingText">Loading Assets...</h1>
		<center><h1 style="
		position:fixed;
		top:50%;
		left:0;
		width:100%;
		height:100vh;
		font-family:arial;
		color:white;
		" hidden id="errrorText">Error!<br>Make sure this has access to the .sb3 file and make sure its on a website, or electron app.</h1></center>
		<script src="scratch/vm.js"></script>
		<script onerror="window.alert('OOPS were sorry but an error has been thrown, please check the devloper console for more info.')">
			window.vm = new Scratch.vm();
			window.file = document.getElementById("files");
			const storage = new Scratch.storage();
			let cvs = document.getElementById("canvas");
			const render = new Scratch.render(cvs);
			const audio = new Scratch.audio();
			const svgRenderer = Scratch.svgRender;
			vm.attachStorage(storage);
			vm.attachRenderer(render);
			vm.attachV2BitmapAdapter(svgRenderer);
			vm.attachAudioEngine(audio);
			if (`+opt.compatibilityMode.toString()+`) {
				vm.setCompatibilityMode(true);
			} else {
				vm.setCompatibilityMode(false);
			}
			if (`+opt.turbomode.toString()+`) {
				vm.setTurboMode(true);
			} else {
				vm.setTurboMode(false);
			}
			vm.runtime.emitProjectLoaded = function () {
				var flagscript = `+opt.clicktostart.toString()+`;
				if (flagscript) {
					document.getElementById("projectstarticon").hidden = false;
					document.getElementById("loadingText").hidden = true;
					cvs.hidden = false;
					document.getElementById("projectstarticon").onclick = function () {
						vm.greenFlag();
						document.getElementById("projectstarticon").hidden = true;
					}
				} else {
					vm.greenFlag();
					document.getElementById("projectstarticon").hidden = true;
					cvs.hidden = false;
					document.getElementById("loadingText").hidden = true;
				}
			}
			var xhr = new XMLHttpRequest();
			xhr.addEventListener('error',function (e,e2,e3) {
				cvs.hidden = true;
				document.getElementById("errrorText").hidden = false;
			});
			xhr.open('GET', 'scratch/project.sb3', true);
			xhr.responseType = 'arraybuffer';

			xhr.onload = function(e) {
			  if (this.status == 200) {
				// get binary data as a response
				var blob = this.response;
				//var bytes = new Uint8Array(blob);
				vm.start();
				vm.loadProject(blob);
				document.getElementById("loadingText").hidden = false;
				cvs.hidden = true;
			  }
			};

			xhr.send();
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
			if (`+opt.nostrech+`) {
				//makes it change size without streching
				cvs.style.top = "50%"; cvs.style.left = "50%"; //place in center
				var Scale = 1;
				var quality = '`+opt.quality+`';
				function checkFullscreen() {
					Scale = window.innerHeight/360;
					if (quality == "hd") {
						cvs.width = Scale*480;
						cvs.height = Scale*360;
						cvs.style.width = Scale*480+"px";
						cvs.style.height = Scale*360+"px";
					} else {
						cvs.width = 480;
						cvs.height = 360;
						cvs.style.width = Scale*480+"px";
						cvs.style.height = Scale*360+"px";
					}
					cvs.style.marginLeft = (Scale*480)/-2+"px";
					cvs.style.marginTop = (Scale*360)/-2+"px";
					setTimeout(checkFullscreen,1);
				}
				setTimeout(checkFullscreen,1);
			}
			vm.postIOData('userData', { username: "`+opt.username+`" });

		</script>
	</body>
</html
`
	log("Ziping Html...");
	zip.file("index.html", html);
	log("2HTML Complete!!!");
	log("Please Wait Zip File Will Download Soon...");
	zip.generateAsync({type:"blob"})
	.then(function(content) {
		var a = document.createElement("a");
		a.download = "result.zip";
		a.setAttribute("href",URL.createObjectURL(content));
		a.click();
	});
}
function startCompile() {
	if (window.projectFile) {
		compile({
			title:document.getElementById("title").value,
			turbomode:document.getElementById("autoturbo").checked,
			compatibilityMode:document.getElementById("compadmode").checked,
			nostrech:document.getElementById("nostrech").checked,
			username:document.getElementById("username").value,
			clicktostart:document.getElementById("clicktostart").checked,
			quality:document.getElementById("quality").value
		});
	} else {
		cons.innerHTML = "";
		log("no file selected!");
	}
}