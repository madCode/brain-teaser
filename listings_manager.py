"""
This class takes in distance-based search information and queries the database to get all listings within a given radius
of a starting point. The results are ordered by distance, descending.

distance calculations adapted from:
    - http://janmatuschek.de/LatitudeLongitudeBoundingCoordinates
"""
import math
import sqlite3

EARTH_RADIUS_KM = 3958.8


class ListingsManager:

    def __init__(self, distance, distance_format, search_lat, search_lon):
        if distance_format == 'km':
            self.distance = distance
        elif distance_format == 'mi':
            self.distance = distance * 1.609
        else:
            # TODO(madeeha): throw an error
            pass
        self.search_lat = search_lat
        self.search_lon = search_lon

    def get_listings_within_distance(self):
        """
        Return listings within a certain radius in km from a central point
        :return: list of dictionaries representing results
        """

        # Format all data needed for query
        search_radius = float(self.distance / EARTH_RADIUS_KM)
        lat_info = self.min_max_latitude(self.search_lat)
        lon_info = self.min_max_longitude(self.search_lat, self.search_lon)
        search_lat_radians = math.radians(self.search_lat)
        search_lon_radians = math.radians(self.search_lon)
        min_lat = math.degrees(lat_info['min_lat'])
        max_lat = math.degrees(lat_info['max_lat'])
        min_lon = math.degrees(lon_info['min_lon'])
        max_lon = math.degrees(lon_info['max_lon'])

        connection = sqlite3.connect('ListingsDB.db')
        cursor = connection.cursor()
        connection.create_function("DISTANCE", 4, self.get_distance)

        # TODO(madeeha): this part of the code is hard to debug.
        #  Consider breaking this function and query creation up a bit
        query_string = "SELECT *, DISTANCE(latitude, longitude, {search_lat}, {search_lon}) as distance" \
                       " FROM listings WHERE (latitude >= {min_lat} AND latitude <= {max_lat}) AND " \
                       "(longitude >= {min_lon} AND longitude <= {max_lon}) AND " \
                       "distance <= {search_radius} ORDER BY distance DESC;"
        formatted_query = query_string.format(min_lat=min_lat, max_lat=max_lat, min_lon=min_lon, max_lon=max_lon,
                                              search_lat=search_lat_radians, search_lon=search_lon_radians,
                                              search_radius=search_radius)
        cursor.execute(formatted_query)
        results = cursor.fetchall()
        return [self.format_result(result) for result in results]

    @staticmethod
    def get_distance(latitude, longitude, search_lat, search_lon):
        return math.acos(math.sin(search_lat) * math.sin(math.radians(latitude))
                         + math.cos(search_lat) * math.cos(math.radians(latitude))
                         * math.cos(math.radians(longitude) - search_lon))

    def min_max_latitude(self, latitude):
        """
        Returns the minimum and maximum latitude listings should have in radians.
        :param latitude: float representing the search center's latitude
        :return: dictionary with keys min_lat (minimum latitude listings should have)
        and max_lat (largest latitude listings should have). Both these values are represented in radians.
        """
        radius_of_search = float(self.distance / EARTH_RADIUS_KM)
        lat_radians = math.radians(latitude)
        return {'min_lat': lat_radians - radius_of_search, 'max_lat': lat_radians + radius_of_search}

    def min_max_longitude(self, latitude, longitude):
        """
        Returns the minimum and maximum longitude listings should have in radians.
        :param latitude: float representing the search center's latitude
        :param longitude: float representing the search center's latitude
        :return: dictionary with keys min_lat (minimum longitude listings should have)
        and max_lat (largest longitude listings should have). Both these values are represented in radians.
        """
        lat_radians = math.radians(latitude)
        lon_radians = math.radians(longitude)
        radius_of_search = float(self.distance / EARTH_RADIUS_KM)
        lon_change = math.asin(math.sin(radius_of_search) / math.cos(lat_radians))
        return {'min_lon': lon_radians - lon_change, 'max_lon': lon_radians + lon_change}

    @staticmethod
    def format_result(result_tuple):
        # TODO(madeeha): ideally we'd want to return some kind of object instead of a dictionary
        keys = ['index', 'id', 'title', 'host_id', 'host_name', 'neighborhood_group', 'neighborhood', 'latitude',
                'longitude', 'room_type', 'price', 'minimum_nights', 'number_of_reviews', 'last_review',
                'reviews_per_month', 'host_listing_count', 'days_available_count', 'distance']
        if len(result_tuple) != len(keys):
            print("List of keys not the same length as result")
            return {}
        else:
            return {keys[i]: result_tuple[i] for i in range(len(keys))}
