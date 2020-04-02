"""
This class takes in a list of Result dictionaries, sorts them based on the search query passed in,
and returns the top X number of results.
"""
import string
import nltk

# TODO(madeeha): documentation on class


class ResultsManager:

    def __init__(self, results):
        self.results = results

    def get_top_results(self, search_string, num_results=5):
        results = self._results_by_score(search_string.lower())
        return results[0:num_results]

    def _results_by_score(self, search_string):
        return sorted(self._score_results(search_string), key=lambda i: i['search_score'], reverse=True)

    def _score_results(self, search_string):
        search_words_list = self._clean_search_string(search_string)
        return [self._score_result(search_words_list, result) for result in self.results]

    def _score_result(self, search_words_list, result):
        # TODO(madeeha): might be better to make a copy of the result here.
        #  Though if we switch to objects, there are other ways
        score = self._calculate_score(search_words_list, result)
        result['search_score'] = score
        return result

    def _clean_search_string(self, search_string):
        try:
            stopwords = set(nltk.corpus.stopwords.words('english'))
        except LookupError:
            nltk.download('stopwords')  # download stopwords list if not already there
            stopwords = set(nltk.corpus.stopwords.words('english'))
        cleaned_search_string = search_string.translate(str.maketrans('', '', string.punctuation))
        cleaned_search_string = cleaned_search_string.split(" ")
        return [word for word in cleaned_search_string if word not in stopwords]

    def _calculate_score(self, search_words_list, result):
        # remove common words from search string
        if result['id'] == 17367289:
            print("It's the one")
        num_references = 0
        title = result['title'] and result['title'].lower()
        host_name = result['host_name'] and result['host_name'].lower()
        neighborhood_group = result['neighborhood_group'] and result['neighborhood_group'].lower()
        neighborhood = result['neighborhood'] and result['neighborhood'].lower()
        room_type = result['room_type'] and result['room_type'].lower()

        for word in search_words_list:
            word = word
            for value in [title, host_name, neighborhood, neighborhood_group, room_type]:
                if value and word in value:
                    # Count how many times an uncommon word in search appears in any field
                    num_references += 1
        return num_references
