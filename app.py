import json
import socketserver
import http.server as server
import re
import urllib.parse
from listings_manager import ListingsManager
from results_manager import ResultsManager
PORT = 9090

"""
This class loads the right html file and handles all requests.

TODO(madeeha): write tests
"""
class AppHandler(server.SimpleHTTPRequestHandler):

    def __init__(self, request, client_address, server):
        super().__init__(request, client_address, server)
        self.parsed_params = {}

    def are_params_valid(self, params):
        # TODO(madeeha): in the future, we should be able to return info on exactly what was wrong with the request
        try:
            self.parsed_params['distance'] = int(params['distance'][0])
            self.parsed_params['distance_format'] = params['distanceFormat'][0]
            self.parsed_params['latitude'] = float(params['latitude'][0])
            self.parsed_params['longitude'] = float(params['longitude'][0])
            self.parsed_params['query'] = params['query'][0]
        except TypeError:
            # TODO(madeeha): Double-check that this is the right error that gets thrown
            return False
        return (self.parsed_params['distance_format'] == 'km' or
                self.parsed_params['distance_format'] == 'mi' and len(params) > 0)

    def do_GET(self):
        if re.search('/api/search/*', self.path) is not None:
            parsed = urllib.parse.urlparse(self.path)
            query_parms = urllib.parse.parse_qs(parsed.query)
            are_params_valid = self.are_params_valid(query_parms)
            if not are_params_valid:
                self.send_error(400, "Bad request. Check parameter types and length")
                return
            listings_manager = ListingsManager(self.parsed_params['distance'], self.parsed_params['distance_format'],
                                               self.parsed_params['latitude'],  self.parsed_params['longitude'])
            results_manager = ResultsManager(listings_manager.get_listings_within_distance())
            results = results_manager.get_top_results(self.parsed_params['query'], 10)
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
