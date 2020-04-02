'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchForm = function (_React$Component) {
  _inherits(SearchForm, _React$Component);

  function SearchForm(props) {
    _classCallCheck(this, SearchForm);

    var _this = _possibleConstructorReturn(this, (SearchForm.__proto__ || Object.getPrototypeOf(SearchForm)).call(this, props));

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

  _createClass(SearchForm, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      // TODO(madeeha): This function is super long, break it up
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

  return SearchForm;
}(React.Component);

export default SearchForm;