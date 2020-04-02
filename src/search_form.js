'use strict';

export default class SearchForm extends React.Component {
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
    // TODO(madeeha): This function is super long, break it up
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
