import json
import listings_manager
import results_manager


class SearchView:

    def get(self, request):
        search_query = json.loads(request.body)
        # {‘latitude’: 40.7306, ‘longitude’: -73.9352, distance: 1000, query: “two
        # bedroom”}
        try:
            listings = listings_manager.ListingsManager(
                search_query['distance'],
                search_query.get('distance_format', 'km'),
                search_query['latitude'],
                search_query['longitude']
            )
            initial_results = listings.get_listings_within_distance()
            results = results_manager.ResultsManager(initial_results)
            return results.get_top_results(search_query['query'], 10)
        except KeyError:
            # TODO(madeeha): return bad request
            return
