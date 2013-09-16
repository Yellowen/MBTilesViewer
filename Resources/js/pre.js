function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var argv = Ti.App.getArguments();
var port = getRandomInt(3000, 9000);


var params = [Ti.API.application.resourcesPath.replace(" ", "\\ ") + '/py/mbserv.py ', port.toString()].concat(argv);
var pyscript = ['python', params];

console.log("PORT: " + port.toString());
console.log("ARGV: " + argv.toString());
console.log("CMDLINE: python " + params.join(" "));

var mbserver = Ti.Process.createProcess({
    args: pyscript
});


if (argv.length != 0) {
    //Launches the process
    console.log("Launching server");
    //mbserver.stdout.attach(function(d) {console.log(d);});
    //mbserver.stderr.attach(console.log);
    mbserver.setOnReadLine(function(d) { console.log(d); });
    mbserver.launch();

}
