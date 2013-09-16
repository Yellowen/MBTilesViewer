import sys
import tornado.ioloop
import tornado.web
import os
from mbtiles import MbtileSet

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write('''
        <h1> Sample URLs </h1>
        <ul>
          <li> <a href="/test/6/10/40.png">PNG</a> (/test/6/10/40.png)</li>
          <li> <a href="/test/6/10/40.json">UTFGrid JSON</a> (/test/6/10/40.json)</li>
          <li> <a href="/test/6/10/40.json?callback=test">UTFGrid JSONP wrapped in "test()" callback</a> (/test/6/10/40.png?callback=test)</li>
        </ul>
        ''')


class MetaDataHandler(tornado.web.RequestHandler):

    def initialize(self, mbtiles):
        self.mbtiles = mbtiles
        self.tileset = MbtileSet(mbtiles=mbtiles)

    def get(self):
        import json
        self.set_header('Content-Type', 'text/json')
        data = self.tileset.get_metadata()
        self.write(json.dumps(data))


class MbtilesHandler(tornado.web.RequestHandler):

    def initialize(self, ext, mbtiles):
        self.ext = ext
        self.mbtiles = mbtiles
        self.tileset = MbtileSet(mbtiles=mbtiles)

    def get(self, z, x, y):
        origin = self.get_arguments('origin')
        try:
            origin = origin[0]
        except IndexError:
            origin = 'top'

        if origin == 'top':
            # invert y axis to top origin
            ymax = 1 << int(z)
            y = ymax - int(y) - 1

        tile = self.tileset.get_tile(z, x, y)
        if self.ext == 'png':
            self.set_header('Content-Type', 'image/png')
            self.write(tile.get_png())
        elif self.ext == 'json':
            callback = self.get_arguments('callback')
            try:
                callback = callback[0]
            except IndexError:
                callback = None

            self.set_header('Content-Type', 'application/json')
            if callback:
                self.write("%s(%s)" % (callback, tile.get_json()))
            else:
                self.write(tile.get_json())


if __name__ == "__main__":

    if len(sys.argv) < 3:
        print "mbserv port mbfile"
        print "You have to provide an mbtile file and a port"

    urls = [
        (r"/", MainHandler),
        (r"/meta/", MetaDataHandler, {"mbtiles": sys.argv[1]}),
    ]

    tilesets = [
        ('tiles', sys.argv[2], ['png', 'json'], ),
    ]

    for t in tilesets:
        for ext in t[2]:
            urls.append(
                (r'/%s/([0-9]+)/([0-9]+)/([0-9]+).%s' % (t[0], ext),
                 MbtilesHandler,
                 {"ext": ext, "mbtiles": t[1]}
                 )
            )

    print ">> Starting server on %s" % sys.argv[1]

    application = tornado.web.Application(urls, debug=True)
    application.listen(int(sys.argv[1]))
    tornado.ioloop.IOLoop.instance().start()
