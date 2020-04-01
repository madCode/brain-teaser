"""A Basic Search API
Create an api where requests can be made to find a room to rent. It’s up to you whether this uses a relational database,
a NOSQL datastore, a search platform, or something custom. You can use whatever technology you feel is most appropriate
- we primarily use Python (werkzeug) for services. If you do not have time to finish an entire application, focus on
what you think is most important. We know you’re busy and appreciate that you’re spending time on this. Data which must
be parsed and imported often has subtle problems in formatting or serialization, and the one we are providing to you
is no exception.

What should the application do?

There should be an api endpoint for finding a room to rent. The provided CSV file has thousands of rentals from the NYC
area. The response from the API should be a structured list of data about the rooms that match an api request containing
a search string, and a latitude/longitude and a distance in meters (both search string and location information are
optional). What does ‘match’ mean exactly? For the location part of the request, it should be the rooms within that
distance from the provided location. How the text part of the query works is totally up to you, feel free to do something
creative. You should try to always return some results, and order them in a way that is somewhat useful for a user.
Example queries that might be posted to the api:
{‘latitude’: 40.7306, ‘longitude’: -73.9352, distance: 1000, query: “two bedroom”}
{‘latitude’: 41, ‘longitude’: -73, distance: 300.7, query: “near the empire state building”}


Data:
- load csv
- parse data into database

Api:
- take in request
- parse request to get location and distance
- figure out min latitude and min longitude
- calculate distances between them
- cut out stuff that's further away
- do a string search of:
name, host_name, neighbourhood_group, neighbourhood, room_type

id
name
host_id
host_name
neighbourhood_group
neighbourhood
latitude
longitude
room_type
price
minimum_nights
number_of_reviews
last_review
reviews_per_month
calculated_host_listings_count
availability_365


you connect to it with the sqlite3 connector in python
6m
and then just export a table from pandas to that database
(pd.read_csv)
df.to_sql()

references:
    - http://janmatuschek.de/LatitudeLongitudeBoundingCoordinates
"""

import nltk

# TODO(madeeha): documentation on class


class ResultsManager:

    def __init__(self, results):
        self.results = results

    def get_top_results(self, search_string, num_results=5):
        results = self._results_by_score(search_string)
        return results[0:num_results]

    def _results_by_score(self, search_string):
        return sorted(self._score_results(search_string), key=lambda i: i['search_score'])

    def _score_results(self, search_string):
        return [self._score_result(search_string, result) for result in self.results]

    @staticmethod
    def _score_result(search_string, result):
        # TODO(madeeha): might be better to make a copy of the result here.
        #  Though if we switch to objects, there are other ways
        score = search_string.calculate_score(search_string, result)
        result['search_score'] = score
        return result

    @staticmethod
    def calculate_score(search_string, result):
        # remove common words from search string
        try:
            stopwords = set(nltk.corpus.stopwords.words('english'))
        except LookupError:
            nltk.download('stopwords')  # download stopwords list if not already there
            stopwords = set(nltk.corpus.stopwords.words('english'))

        words_in_search = [word for word in search_string if word not in stopwords]
        num_references = 0
        title = result['title']
        host_name = result['host_name']
        neighborhood_group = result['neighborhood_group']
        neighborhood = result['neighborhood']
        room_type = result['room_type']

        for word in words_in_search:
            for value in [title, host_name, neighborhood, neighborhood_group, room_type]:
                if word in value:
                    # Count how many times an uncommon word in search appears in any field
                    num_references += 1
        return num_references
