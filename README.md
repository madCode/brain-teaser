# brain-teaser
This app allows users to search for AirBnb listings based on some search terms as well as distance from a desired location.

## Packages needed:
- [nltk](https://www.nltk.org/install.html)
- sqlite3
    - should already be installed with python
- SimpleHTTPServer
    - preinstalled on Macs, can be installed on Windows
- python 3
    
## How to Run
#### Step 1. Start up the web server
Navigate to the folder that contains the project and the listings_search.html file.

run `python app.py`

#### Step 2. Navigate to website
Open your browser and go to http://localhost:9090/listings_search.html

## Next Steps
Obviously, it's hard to build everything you want in a short period of time. Here are some next steps I would have taken if I had more time:
1. write tests at minimum for all the python classes
2. Make the UI prettier
3. Do an architecture pass: some of the files are a little long or loosely organized. After doing an MVP like this, it's helpful to do an architecture pass and modify any structures that no longer "spark joy"
4. Allow the user to input an address and convert that to a lat/lon that can be used in the backend search.
5. Allow the user to search across more fields (e.g. room type, price, etc)
6. Allow sorting of table based on user's preferences

