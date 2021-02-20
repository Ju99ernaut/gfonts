import React from 'react';
import WebFont from 'webfontloader';
import $ from 'cash-dom';
import Sidebar from "react-sidebar";
import Settings from './Settings';
import Fonts from './Fonts';
import Modal from './Modal';
import Navbar from './Settings/Navbar';
import 'font-awesome/css/font-awesome.min.css';

const mql = window.matchMedia(`(min-width: 600px)`);

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
      groupSize: 900,
      sidebarDocked: mql.matches,
      sidebarOpen: false
    };
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen = (open) => {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged = () => {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
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
        <Sidebar
          sidebar={<Settings onChange={this.getSetting} />}
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ content: { overflowY: 'hidden' } }}
        >
          <Navbar onClick={() => this.onSetSidebarOpen(true)}/>
          <Fonts setModal={this.setModal} settings={settings} stars={this.state.stars} onChange={this.setStars} />
          <Modal font={this.state.font} stars={this.state.stars} onChange={this.setStars} />
        </Sidebar>
      </div>
    );
  }
}

export default App;