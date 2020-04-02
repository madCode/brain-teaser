import json
import socketserver
import http.server as server
import re
import urllib.parse
from listings_manager import ListingsManager
from results_manager import ResultsManager
PORT = 9090


class AppHandler(server.SimpleHTTPRequestHandler):

    def do_GET(self):
        if re.search('/api/search/*', self.path) is not None:
            parsed = urllib.parse.urlparse(self.path)
            query_parms = urllib.parse.parse_qs(parsed.query)
            # check types for everything
            listings_manager = ListingsManager(int(query_parms['distance'][0]), query_parms['distanceFormat'][0],
                                               float(query_parms['latitude'][0]), float(query_parms['longitude'][0]))
            results_manager = ResultsManager(listings_manager.get_listings_within_distance())
            results = results_manager.get_top_results(query_parms['query'][0], 10)
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(bytes(json.dumps(results), 'utf-8'))
            return
        else:
            # serve files, and directory listings by following self.path from
            # current working directory
            server.SimpleHTTPRequestHandler.do_GET(self)


httpd = socketserver.ThreadingTCPServer(('', PORT), AppHandler)
print("serving at port", PORT)
httpd.serve_forever()
