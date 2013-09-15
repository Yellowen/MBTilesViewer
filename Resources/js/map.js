var map;

var custom_button_func = function(){
    //Get a random coordinate from -90 to 90
    var random_lon = Math.floor(Math.random() * 360) - 180;
    var random_lat = Math.floor(Math.random() * 180) - 90;
    if(map.layers[0].opacity === 1){
	//If the layer opacity is 1 (fully opaque), then change it
	// and zoom
	map.layers[0].setOpacity(.5);
	map.setCenter(new OpenLayers.LonLat(random_lon,
					    random_lat), 3);
    }
    else{
	//If the layer opacity is anything but 1, change it and
	// zoom
	map.layers[0].setOpacity(1);
	map.setCenter(new OpenLayers.LonLat(random_lon,
					    random_lat), 3);
    }
};


function map_init() {
    var map;
    OpenLayers.Lang.setCode(document.lang_code);

    map = new OpenLayers.Map("map", {
	controls: []
    });


    var osm = new OpenLayers.Layer.OSM(
	"Open Street Map"
    );

    arrayOSM = ["http://otile1.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg",
                "http://otile2.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg",
                "http://otile3.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg",
                "http://otile4.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg"];

    arrayAerial = ["http://otile1.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
                   "http://otile2.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
                   "http://otile3.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
                   "http://otile4.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg"];

    baseOSM = new OpenLayers.Layer.OSM("MapQuest-OSM Tiles", arrayOSM);
    baseAerial = new OpenLayers.Layer.OSM("MapQuest Open Aerial Tiles", arrayAerial);

    map.addLayer(baseOSM);
    map.addLayer(baseAerial);

    map.addControls([
	new OpenLayers.Control.ZoomBox(),
	new OpenLayers.Control.ZoomToMaxExtent(),
	new OpenLayers.Control.PanZoomBar({}),
	new OpenLayers.Control.LayerSwitcher({}),
	new OpenLayers.Control.MousePosition({}),
        new OpenLayers.Control.Navigation()

    ]);

    map.addLayers([osm]);

    var lon = 51.6713889;
    var lat = 32.6597222;
    var zoom = 10;

    var proj = new OpenLayers.Projection("EPSG:4326");
    var point = new OpenLayers.LonLat(lon, lat);

    map.setCenter(point.transform(proj, map.getProjectionObject()), zoom);
    /*if (!map.getCenter()) {
	map.zoomToMaxExtent();
    }*/


    /* var wfsLayer = new OpenLayers.Layer.Vector("Test Polygons", {
        projection : "EPSG:4326",
        extractAttributes: true,
        visibility: true
    }); */




}

$(function(){
    map_init2();
});

function map_init2() {
    /*
      var map;

      var mapquestOSM = new OpenLayers.Layer.XYZ("MapQuest Streets", ["http://otile1.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png", "http://otile2.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png", "http://otile3.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png", "http://otile4.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png"], {
      attribution: "Data, imagery and map information provided by <a href='http://www.mapquest.com/'  target='_blank'>MapQuest</a>, <a href='http://www.openstreetmap.org/' target='_blank'>Open Street Map</a> and contributors, <a href='http://creativecommons.org/licenses/by-sa/2.0/' target='_blank'>CC-BY-SA</a>  <img src='http://developer.mapquest.com/content/osm/mq_logo.png' border='0'>",
      transitionEffect: "resize"
      });

      var mapquestOAM = new OpenLayers.Layer.XYZ("MapQuest Aerial", ["http://oatile1.mqcdn.com/naip/${z}/${x}/${y}.png", "http://oatile2.mqcdn.com/naip/${z}/${x}/${y}.png", "http://oatile3.mqcdn.com/naip/${z}/${x}/${y}.png", "http://oatile4.mqcdn.com/naip/${z}/${x}/${y}.png"], {
      attribution: "Tiles Courtesy of <a href='http://open.mapquest.co.uk/' target='_blank'>MapQuest</a>. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency. <img src='http://developer.mapquest.com/content/osm/mq_logo.png' border='0'>",
      transitionEffect: "resize"
      });

      var hostedTiles = new OpenLayers.Layer.XYZ("Hosted Tiles", ["http://a.tiles.mapbox.com/v3/mapbox.geography-class/${z}/${x}/${y}.png", "http://b.tiles.mapbox.com/v3/mapbox.geography-class/${z}/${x}/${y}.png", "http://c.tiles.mapbox.com/v3/mapbox.geography-class/${z}/${x}/${y}.png", "http://d.tiles.mapbox.com/v3/mapbox.geography-class/${z}/${x}/${y}.png"], {
      attribution: "Tiles Courtesy of <a href='http://tiles.mapbox.com/mapbox/map/geography-class' target='_blank'>MapBox</a>",
      transitionEffect: "resize",
      isBaseLayer: false,
      opacity: 0.7,
      visibility: false
      });
    */
    // create TMS layer using MBTiles sqlite database
    /*var mbTiles = new OpenLayers.Layer.TMS("Local MBTiles File", "http://localhost:8988/test/", {
        getURL: mbtilesURL,
        attribution: "Tiles Courtesy of <a href='http://tiles.mapbox.com/mapbox/map/geography-class' target='_blank'>MapBox</a>",
        transitionEffect: "resize",
        isBaseLayer: true,
        opacity: 1
    });*/

    var mbTiles = new OpenLayers.Layer.XYZ("MapQuest Aerial", ["http://localhost:8988/test/${z}/${x}/${y}.png"], {
        attribution: "Tiles Courtesy",
        transitionEffect: "resize"
    });
    // See: http://www.maptiler.org/google-maps-coordinates-tile-bounds-projection
    function mbtilesURL (bounds) {
        var db = "geography-class.mbtiles";
        var res = this.map.getResolution();
        var x = Math.round ((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
        var y = Math.round ((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
        var z = this.map.getZoom();
        // Deal with Bing layers zoom difference...
        if (this.map.baseLayer.CLASS_NAME == 'OpenLayers.Layer.VirtualEarth' || this.map.baseLayer.CLASS_NAME == 'OpenLayers.Layer.Bing') {
            z = z + 1;
        }
        return this.url + z +"/"+ x +"/"+((1 << z) - y - 1) + ".png";

    }

    var map = new OpenLayers.Map('map', {
        //projection: "EPSG:900913",
        layers: [mbTiles]
    });

    var lon = 51;
    var lat = 32;
    var zoom = 11;

    var proj = new OpenLayers.Projection("EPSG:4326");
    var point = new OpenLayers.LonLat(lon, lat);

    map.setCenter(point.transform(proj, map.getProjectionObject()), zoom);

    //map.zoomToMaxExtent();

    var switcherControl = new OpenLayers.Control.LayerSwitcher();

    map.addControl(switcherControl);

    switcherControl.maximizeControl();
}
