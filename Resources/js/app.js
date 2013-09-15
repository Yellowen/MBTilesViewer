function init() {
    $("#open").on("click", function(){
	var file = Ti.UI.currentWindow.openFileChooserDialog(function(){},
							     {multiple: false,
							      title: "Open MbTiles file *.mbtiles"});
    });
    $("#exit").on("click", function(){
	  if (confirm('Are you sure you want to quit?')) {
	      Ti.App.exit();
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
	Ti.Platform.openURL("http://www.yellowen.com");
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

    console.log("Skel Width: " + width);
    console.log("Skel Height: " + height);

    // Get the header heiight
    var header_height = $("header").height();

    var statusbarheight = $("#statusbar").height();

    var map_width = width - panelwidth;
    var map_height = height - header_height - statusbarheight;

    // set new size
    $("#map").width(map_width).height(map_height);
    $("#statusbar").width(map_width);
    $("#panel").height(map_height + statusbarheight);

    // store new size
    document.map = {width: map_width,
		    height: map_height};

}

$(function(){
    init();
    var window = Ti.UI.currentWindow;
    // Set the #map size
    console.log("Setting new size");
    resize_map();

    // bound the resize_map function to window resize event
    window.addEventListner('resized', resize_map);
});
