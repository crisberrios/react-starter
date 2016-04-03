var React = require('react');
var ExampleComponent = React.createClass({
  displayName: 'ExampleComponent',
  getInitialState: function(){
    return {
      name: 'Awesome User'
    }
  },
  propTypes: {
    name: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <p className="example">Welcome to React{this.props.name}!</p>
    )
  }
});

module.exports = ExampleComponent;
