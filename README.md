# brain-teaser

##Packages needed:
- [nltk](https://www.nltk.org/install.html)
- sqlite3
    - should already be installed with python
- SimpleHTTPServer
    - preinstalled on Macs, can be installed on Windows
    
##How to Run
####Step 1. Start up the web server
Navigate to the folder that contains the project and the listings_search.html file.

If using python 2.x, run:
`python -m SimpleHTTPServer 60000` (or other port number of your choice)

If using python 3.x run:
`python -m http.server 60000` (or other port of choice)

####Step 2. Navigate to website
Open your browser and go to http://localhost:60000/listings_search.html
