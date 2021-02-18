// jshint ignore: start
import React from 'react';
import _ from 'underscore';

class Sample extends React.Component {
  constructor(props) {
    super(props);
    this.refText = React.createRef();
    this.state = {
      texts: [
        "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz 0123456789",
        "Font Name",
        "Grumpy wizards make toxic brew for the evil Queen and Jack.",
        "Bright vixens jump dozy fowl quack",
        "Waltz bad nymph for quick jugs vex",
        "Brick quiz whangs jumpy veldt fox",
        "The quick brown fox jumps over the lazy dog."
      ]
    };
    this.delayedCallback = _.debounce(function(event) {
      const value = event.target.value;
      this.props.onChange({text: value});
    }, 500);
  }

  onChange = (event) => {
    event.persist();
    this.delayedCallback(event);
  }

  refresh = () => {
    const value = this.state.texts.shift();
    this.state.texts.push(value);
    this.refText.current.value = value;
    this.props.onChange({text: value});
  }

  render() {
    return (
      <div className="text">
        <h2>Preview Text</h2>
        <input type="text" ref={this.refText} onChange={this.onChange} defaultValue="The quick brown fox jumps over the lazy dog." />
        <span className="refresh" onClick={this.refresh} title="Load Pangram"><i className="fa fa-refresh"></i></span>
      </div>
    );
  }
};

export default Sample;