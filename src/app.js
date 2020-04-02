'use strict';
import SearchForm from './search_form.js';
import ListingsList from './listings_list.js';

// TODO(madeeha): the frontend could be much prettier and allow searching along way more parameters

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
        <SearchForm successHandler={this.updateListings.bind(this)} />
        <ListingsList listingsList={this.state.listings} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
