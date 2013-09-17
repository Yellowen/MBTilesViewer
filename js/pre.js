var gui = require('nw.gui');
var spawn = require('child_process').spawn;

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var port = getRandomInt(3000, 9000).toString();
var mbfile = "";
var map = null;
var server = undefined;


function run_server(filepath, _port) {

    console.log("Running server");
    console.log("SERVER TYPE: " + typeof(server));
    console.dir(server);
    if (server != undefined) {
	console.log("Killing previous server");
	server.kill("SIGKILL");
    }

    console.log ("CMD: " + process.cwd() + "/py/mbserv.py");
    server = spawn(
	"python", [process.cwd() + "/py/mbserv.py"], {
	    env: {
		"servfile": filepath,
		"servport": _port
	    }
	});

    console.log("SERVER: " + filepath + " " + _port);
    console.dir(server);

    server.stdout.once('data', function (data) {
	console.log('stdout: ' + data);
    });

    server.stderr.once('data', function (data) {
	console.log('stderr: ' + data);
    });

    server.once('close', function (code) {
	console.log('child process exited with code ' + code);
    });
}


console.log("ARGV: " + gui.App.argv);

if (gui.App.argv.length > 0) {
    mbfile = gui.App.argv[0];

    console.log("Spawning server app.");
    run_server(mbfile, port);
}

console.log("PORT: " + port);
console.log("MBFILE: " + mbfile);
console.log("dir: " + process.cwd());

//var inline = '     <header id="menu">	<ul>	  <li id="open"><span>Open</span></li>	  <li id="aboutbtn"><span>About</span></li>	  <li id="exit"><span>Exit</span></li>	</ul>      </header>      <div id="about">	<h1 class="logo"></h1>	<h2>MBTiles Viewer v0.1.0</h2>	<h3>Released under the terms of GPLv2</h3>        <div class="buttons">	  <button id="back">Back</button>	  <button id="website">Visit Web Site</button>	</div>      </div>      <div id="map">      </div>';

//window.document.getElementById("skel").innerHTML = inline;
