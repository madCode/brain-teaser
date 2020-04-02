'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListingsList = function (_React$Component) {
  _inherits(ListingsList, _React$Component);

  function ListingsList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ListingsList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ListingsList.__proto__ || Object.getPrototypeOf(ListingsList)).call.apply(_ref, [this].concat(args))), _this), _this.getBody = function () {
      var rows = [];
      _this.props.listingsList.forEach(function (listing) {
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
    }, _temp), _possibleConstructorReturn(_this, _ret);
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

export default ListingsList;