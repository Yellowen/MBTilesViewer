function chooseFile(name) {
    var chooser = $(name);
    chooser.change(function(evt) {

	var filepath = $(this).val();
	port = getRandomInt(3000, 9000).toString();
	console.log(filepath);
	console.log(port);
	$("body").data("filepath", filepath);
	run_server(filepath, port);
	map_init();
	chooser.val("");
    });

    chooser.trigger('click');
}

function init() {
    $("#open").on("click", function(){
	chooseFile("#fileDialog");
    });
    $("#exit").on("click", function(){
	if (confirm('Are you sure you want to quit?')) {
	    server.kill("SIGKILL");
	    gui.App.quit();
	}
    });

    $("#aboutbtn").on("click", function(){
	if (! $("#about").hasClass("show")) {
	    $("#map").fadeOut(400);
	    $("#about").delay(450).fadeIn(400);
	    $("#about").addClass("show");
	}
    });

    $("#back").on("click", function(){
	if ($("#about").hasClass("show")) {
	    $("#about").fadeOut(400);
	    $("#map").delay(450).fadeIn(400);
	    $("#about").removeClass("show");
	}
    });

    $("#website").on("click", function(){
	    gui.Shell.openExternal("http://www.yellowen.com");
    });

    var menu = $("#menu")
    var map = $("#map");

    map.height(map.height() - menu.height());
    map.css("top", menu.height());
}

function resize_map(){
    // Retrieve container size
    var width = $('#skel').width();
    var height = $('#skel').height();

    // Get the header heiight
    var header_height = $("header").height();
    var map_width = width;
    var map_height = height - header_height;

    console.log(height);
    console.log("WIDTH: " + map_width);
    console.log("HEIGHT: " + map_height);
    // set new size
    $("#map").width(map_width).height(map_height);

    // store new size
    document.map = {width: map_width,
		    height: map_height};

}

$(function(){
    init();
    //var window = Ti.UI.getCurrentWindow();
    // Set the #map size
    resize_map();
    $(window).resize(resize_map);
    gui.Window.get().on("close", function() {
	server.kill("SIGKILL");
	this.close(true);
    });
});
