import logging
from landez import MBTilesBuilder

logging.basicConfig(level=logging.DEBUG)

mb = MBTilesBuilder(cache=False)
mb.add_coverage(bbox=(50.5, 31.5, 51.5, 32.5),
                zoomlevels=[10, 11])
mb.run()
