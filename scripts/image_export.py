import logging
from landez import ImageExporter

logging.basicConfig(level=logging.DEBUG)

ie = ImageExporter(mbtiles_file="/home/lxsameer/src/tmp/tut/tiles.mbtiles")
ie.export_image(bbox=(50.5, 31.5, 51.5, 32.5),
                zoomlevel=11, imagepath="image.png")
