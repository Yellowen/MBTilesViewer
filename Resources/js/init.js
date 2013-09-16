function resize_map(){
    // Retrieve container size
    var width = $('#skel').width();
    var height = $('#skel').height();

    // Get the header heiight
    var header_height = $("header").height();

    var map_width = width;
    var map_height = height - header_height;

    // set new size
    $("#map").width(map_width).height(map_height);

    // store new size
    document.map = {width: map_width,
		    height: map_height};

}

$(function(){

    // Set the #map size
    console.log("Setting new size");
    resize_map();

    // bound the resize_map function to window resize event
    $(window).resize(resize_map);

    // Set the panel height
    //$("#panel").height(document.map.height);
    // Click event handler of panelhandler
    $("#panelhandle").click(function(){
	if ($(this).hasClass("opened")) {
	    $(this).removeClass("opened").css("left", "0");
	    $("#map").css("left", "0");
	    $("#panel").hide();
	    resize_map();

	}
	else {
	    $(this).css("left", "354px").addClass("opened");
	    $("#panel").show();
	    $("#map").width($("#map").width() - 354).css("left", "354px");

	}
	map.updateSize();

    });
});
