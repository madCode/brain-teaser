'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MyForm = function (_React$Component) {
  _inherits(MyForm, _React$Component);

  function MyForm(props) {
    _classCallCheck(this, MyForm);

    var _this = _possibleConstructorReturn(this, (MyForm.__proto__ || Object.getPrototypeOf(MyForm)).call(this, props));

    _this.handleSubmit = function (event) {
      axios.get('/api/search/', { params: _this.state }).then(function (response) {
        _this.props.successHandler(response.data);
      }).catch(function (error) {
        console.log(error);
      });
      event.preventDefault();
    };

    _this.state = {
      query: '',
      distance: 1000,
      distanceFormat: 'km',
      latitude: 40.72,
      longitude: -73.96
    };
    return _this;
  }

  _createClass(MyForm, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'form',
        { onSubmit: this.handleSubmit.bind(this) },
        React.createElement(
          'h1',
          null,
          'Listings Search'
        ),
        React.createElement(
          'label',
          null,
          'Search:',
          React.createElement('input', {
            type: 'text',
            value: this.state.query,
            placeholder: 'Type a search query',
            onChange: function onChange(e) {
              return _this2.setState({ query: e.target.value.toString() });
            }
          })
        ),
        React.createElement(
          'label',
          null,
          'Ideal Latitude:',
          React.createElement('input', {
            type: 'number',
            step: '0.01',
            value: this.state.latitude,
            placeholder: '40.72',
            onChange: function onChange(e) {
              return _this2.setState({ latitude: e.target.valueAsNumber });
            }
          })
        ),
        React.createElement(
          'label',
          null,
          'Ideal Longitude:',
          React.createElement('input', {
            type: 'number',
            step: '0.01',
            value: this.state.longitude,
            placeholder: '-73.96',
            onChange: function onChange(e) {
              return _this2.setState({ longitude: e.target.valueAsNumber });
            }
          })
        ),
        React.createElement(
          'label',
          null,
          'Maximum distance from location:',
          React.createElement('input', {
            type: 'number',
            min: '0',
            step: '0.01',
            value: this.state.distance,
            placeholder: '1000',
            onChange: function onChange(e) {
              return _this2.setState({ distance: e.target.valueAsNumber });
            }
          })
        ),
        React.createElement(
          'select',
          { id: 'distanceFormat' },
          React.createElement(
            'option',
            { value: 'km', onSelect: function onSelect() {
                return _this2.setState({ distanceFormat: 'km' });
              } },
            'km'
          ),
          React.createElement(
            'option',
            { value: 'mi', onSelect: function onSelect() {
                return _this2.setState({ distanceFormat: 'mi' });
              } },
            'mi'
          )
        ),
        React.createElement('input', { type: 'submit', value: 'Submit' })
      );
    }
  }]);

  return MyForm;
}(React.Component);

var ListingsList = function (_React$Component2) {
  _inherits(ListingsList, _React$Component2);

  function ListingsList() {
    var _ref;

    var _temp, _this3, _ret;

    _classCallCheck(this, ListingsList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref = ListingsList.__proto__ || Object.getPrototypeOf(ListingsList)).call.apply(_ref, [this].concat(args))), _this3), _this3.getBody = function () {
      var rows = [];
      _this3.props.listingsList.forEach(function (listing) {
        rows.push(React.createElement(
          'tr',
          { key: listing.id },
          React.createElement(
            'td',
            null,
            listing.title
          ),
          React.createElement(
            'td',
            null,
            listing.host_name
          ),
          React.createElement(
            'td',
            null,
            listing.neighborhood
          ),
          React.createElement(
            'td',
            null,
            listing.neighborhood_group
          ),
          React.createElement(
            'td',
            null,
            listing.room_type
          ),
          React.createElement(
            'td',
            null,
            listing.price
          ),
          React.createElement(
            'td',
            null,
            listing.minimum_nights
          ),
          React.createElement(
            'td',
            null,
            listing.number_of_reviews
          ),
          React.createElement(
            'td',
            null,
            'Lat: ',
            listing.latitude,
            ', Lon: ',
            listing.longitude
          )
        ));
      });
      return rows;
    }, _temp), _possibleConstructorReturn(_this3, _ret);
  }

  _createClass(ListingsList, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'table',
        null,
        React.createElement(
          'thead',
          null,
          React.createElement(
            'tr',
            null,
            React.createElement(
              'th',
              null,
              'Listing Title'
            ),
            React.createElement(
              'th',
              null,
              'Host Name'
            ),
            React.createElement(
              'th',
              null,
              'Neighborhood'
            ),
            React.createElement(
              'th',
              null,
              'Neighborhood Area'
            ),
            React.createElement(
              'th',
              null,
              'Room Type'
            ),
            React.createElement(
              'th',
              null,
              'Price'
            ),
            React.createElement(
              'th',
              null,
              'Minimum Nights'
            ),
            React.createElement(
              'th',
              null,
              'Number of Reviews'
            ),
            React.createElement(
              'th',
              null,
              'Location'
            )
          )
        ),
        React.createElement(
          'tbody',
          null,
          this.getBody()
        )
      );
    }
  }]);

  return ListingsList;
}(React.Component);

var App = function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App(props) {
    _classCallCheck(this, App);

    var _this4 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this4.updateListings = function (listings) {
      _this4.setState({ listings: listings });
    };

    _this4.state = {
      listings: []
    };
    return _this4;
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(MyForm, { successHandler: this.updateListings.bind(this) }),
        React.createElement(ListingsList, { listingsList: this.state.listings })
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('like_button_container'));