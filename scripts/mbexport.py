import logging
from landez import MBTilesBuilder

logging.basicConfig(level=logging.DEBUG)

#mb = MBTilesBuilder(cache=False)
mb = MBTilesBuilder(wms_server="http://map1.vis.earthdata.nasa.gov/twms-geo/twms.cgi",
                    wms_layers=["global_mosaic"],
                    wms_options=dict(format="image/jpeg",
                                     transparent=False),
                    filepath="dest.mbtiles")
mb.add_coverage(bbox=(50.5, 31.5, 51.5, 32.5),
                zoomlevels=[10, 11])
mb.run()
