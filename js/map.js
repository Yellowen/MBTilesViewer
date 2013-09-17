$(function(){
    if (mbfile != "") {
	map_init();
    }
});

function map_init() {

    // create TMS layer using MBTiles sqlite database
    console.log("create new TMS layer on " + port);
    var mbTiles = new OpenLayers.Layer.TMS("Local MBTiles File", "http://localhost:" + port + "/tiles/", {
	getURL: mbtilesURL,
	//attribution: "Tiles Courtesy of <a href='http://tiles.mapbox.com/mapbox/map/geography-class' target='_blank'>MapBox</a>",
	transitionEffect: "resize",
	isBaseLayer: true,
	opacity: 1
    });

    // See: http://www.maptiler.org/google-maps-coordinates-tile-bounds-projection
    function long2tile(lon,zoom) {
	return (Math.floor((lon+180)/360*Math.pow(2,zoom)));
    }
    function lat2tile(lat,zoom)  {
	return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)));
    }

    function mbtilesURL(bounds) {
	var res = this.map.getResolution();
	var z = this.map.getZoom();

	// Deal with Bing layers zoom difference...
	if (this.map.baseLayer.CLASS_NAME == 'OpenLayers.Layer.VirtualEarth' || this.map.baseLayer.CLASS_NAME == 'OpenLayers.Layer.Bing') {
            z = z + 1;
	}
	return this.url + (z) +"/"+ long2tile(bounds.left, z)  +"/"+  lat2tile(bounds.top, z)  + ".png";
    }

    map = new OpenLayers.Map('map', {
	//projection: "EPSG:900913",
	layers: [mbTiles],
	controls: []
    });

    map.addControls([
	new OpenLayers.Control.ZoomBox(),
	new OpenLayers.Control.ZoomToMaxExtent(),
	new OpenLayers.Control.PanZoomBar({}),
	new OpenLayers.Control.LayerSwitcher({}),
	new OpenLayers.Control.MousePosition({}),
        new OpenLayers.Control.Navigation()

    ]);

    var lon;
    var lat;
    var zoom;

    console.log("Fetching metadata from " + port);
    $.ajax({url: "http://localhost:" + port + "/meta/",
	    async: true,
	    success: function(data){
		console.log("Metadata fetched");
		var center = data["center"].split(",");
		lon = center[0];
		lat = center[1];
		zoom = center[2];
		console.log ("LON: " + lon);
		console.log("LAT: " + lat);
		console.log("ZOOM: " + zoom);
		var proj = new OpenLayers.Projection("EPSG:4326");
		var point = new OpenLayers.LonLat(lon, lat);

		map.setCenter(point.transform(proj, map.getProjectionObject()), zoom);

	    },
	    error: function(e){
		console.dir(e);
		alert(e.statusText);
	    }
	   });


}
