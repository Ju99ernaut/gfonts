import React from 'react';
import WebFont from 'webfontloader';
import $ from 'cash-dom';
import Settings from './Settings';
import Fonts from './Fonts';
import Modal from './Modal';
//import logo from './logo.svg';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    const stars = localStorage.getItem('stars');
    this.state = {
      search: '',
      category: 'all',
      filterType: 'category',
      sort: 'popularity',
      display: 'grid',
      text: 'The quick brown fox jumps over the lazy dog.',
      data: [],
      font: {family: '', variants: [], subsets: []},
      stars: stars ? JSON.parse(stars) : [],
      groupSize: 900
    };
  }

  getSetting = (s) => {
    this.setState(s);
  }

  setStars = (stars) => {
    this.setState(stars);
    localStorage.setItem('stars', JSON.stringify(stars));
  }

  setModal = (font) => {
    var that = this;
    var fonts = [];
    fonts.push(font.family + ':' + font.variants.join(',') + ':' + font.subsets.join(','));

    WebFont.load({
      classes: false,
      google: {
        families: fonts,
        text: 'acdedghilmnortuxBEILMNSTU0123456789-'
      },
      active: function() {
        that.setState({font: font});
        $('.modal')
          .addClass('show')
          .find('input[type="checkbox"]').attr('checked', false);
      }
    });
  }

  render () {
    const settings = {
      search: this.state.search,
      category: this.state.category,
      filterType: this.state.filterType,
      sort: this.state.sort,
      text: this.state.text,
      groupSize: this.state.groupSize,
      stars: this.state.stars
    };

    return (
      <div id="app">
        <Settings onChange={this.getSetting} />
        <Fonts setModal={this.setModal} settings={settings} stars={this.state.stars} onChange={this.setStars} />
        <Modal font={this.state.font} stars={this.state.stars} onChange={this.setStars} />
      </div>
    );
  }
}

export default App;