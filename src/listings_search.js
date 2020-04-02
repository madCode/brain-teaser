'use strict';

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      distance: 1000,
      distanceFormat: 'km',
      latitude: 40.72,
      longitude: -73.96,
    };
  }

  handleSubmit = event => {
    axios
      .get('/api/search/', {params: this.state})
      .then(response => {
        this.props.successHandler(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <h1>Listings Search</h1>
        <label>
          Search:
          <input
            type="text"
            value={this.state.query}
            placeholder="Type a search query"
            onChange={e => this.setState({query: e.target.value.toString()})}
          />
        </label>
        <label>
          Ideal Latitude:
          <input
            type="number"
            step="0.01"
            value={this.state.latitude}
            placeholder="40.72"
            onChange={e => this.setState({latitude: e.target.valueAsNumber})}
          />
        </label>
        <label>
          Ideal Longitude:
          <input
            type="number"
            step="0.01"
            value={this.state.longitude}
            placeholder="-73.96"
            onChange={e => this.setState({longitude: e.target.valueAsNumber})}
          />
        </label>
        <label>
          Maximum distance from location:
          <input
            type="number"
            min="0"
            step="0.01"
            value={this.state.distance}
            placeholder="1000"
            onChange={e => this.setState({distance: e.target.valueAsNumber})}
          />
        </label>
        <select id="distanceFormat">
          <option value="km" onSelect={() => this.setState({distanceFormat: 'km'})}>
            km
          </option>
          <option value="mi" onSelect={() => this.setState({distanceFormat: 'mi'})}>
            mi
          </option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class ListingsList extends React.Component {
  getBody = () => {
    const rows = [];
      this.props.listingsList.forEach(listing => {
        rows.push(
          <tr key={listing.id}>
            <td>{listing.title}</td>
            <td>{listing.host_name}</td>
            <td>{listing.neighborhood}</td>
            <td>{listing.neighborhood_group}</td>
            <td>{listing.room_type}</td>
            <td>{listing.price}</td>
            <td>{listing.minimum_nights}</td>
            <td>{listing.number_of_reviews}</td>
            <td>
              Lat: {listing.latitude}, Lon: {listing.longitude}
            </td>
          </tr>
        );
      });
    return rows;
  };

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Listing Title</th>
            <th>Host Name</th>
            <th>Neighborhood</th>
            <th>Neighborhood Area</th>
            <th>Room Type</th>
            <th>Price</th>
            <th>Minimum Nights</th>
            <th>Number of Reviews</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>{this.getBody()}</tbody>
      </table>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
    };
  }

  updateListings = listings => {
    this.setState({listings: listings});
  };

  render() {
    return (
      <div>
        <MyForm successHandler={this.updateListings.bind(this)} />
        <ListingsList listingsList={this.state.listings} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('like_button_container'));
