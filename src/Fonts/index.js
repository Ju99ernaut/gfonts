// jshint ignore: start

import React from 'react';
import Infinite from 'react-infinite-scroll-component';
import WebFont from 'webfontloader';
import Batch from './Batch';
import fetch from '../utils/fetch';

class Fonts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      isInfiniteLoading: false,
      groupSize: Math.max(24, Math.ceil(window.innerHeight / 150) * 4),
      matchCount: 1,
      suggestions: {
        paragraphs: ['Alegreya', 'Asap', 'Average', 'Cabin', 'Cardo', 'Crete Round', 'Crimson Text', 'Domine', 'Droid Sans', 'Droid Serif', 'Exo', 'Gentium Book Basic', 'Josefin Slab', 'Kreon', 'Lora', 'Libre Baskerville', 'Merriweather', 'Neuton', 'Noticia Text', 'Old Standard TT', 'Open Sans', 'Poly', 'PT Sans', 'PT Serif', 'Roboto', 'Source Sans Pro', 'Ubuntu', 'Varela', 'Vollkorn', 'Work Sans'],
        headings: ['Abel', 'Arvo', 'Bitter', 'Bree Serif', 'Cabin', 'Droid Sans', 'Droid Serif', 'Gudea', 'Istok Web', 'Lato', 'Lobster', 'Merriweather', 'Montserrat', 'Muli', 'Nunito', 'Open Sans', 'Oswald', 'Pacifico', 'Playfair Display', 'PT Sans', 'PT Serif', 'Quicksand', 'Raleway', 'Roboto', 'Roboto Slab', 'Rokkitt', 'Ubuntu', 'Varela', 'Vollkorn', 'Work Sans']
      }
    };
  }

  componentDidMount() {
    this.loadFontData();
  }

  loadFontData = () => {
    const url = 'https://www.googleapis.com/webfonts/v1/webfonts?';
    const key = 'key=AIzaSyDrwscy04xGYMeRyeWOnxXilRnyCafwqHA';
    const sort = this.props.settings.sort;

    fetch(`${url}sort=${sort}&${key}`)
        .then((res) => res.json())
        .then((response) => {
          let obj = this.state.data || {};
          obj[sort] = response.items;

          this.setState({data: obj});

          let fonts = [];
          const that = this;

          for (let i = 0; i < 8; i++) {
            const font = response.items[i];
            fonts.push(font.family);
          }

          WebFont.load({
            classes: false,
            google: {
              families: fonts,
              text: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            },
            active() {
              that.handleInfiniteLoad();
            }
          });
        })
        .catch((err, status) =>
          console.error(this.props.url, status, err.toString())
        );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.elements.length === 0 && nextState.matchCount !== 0) {
      return false;
    } else {
      return true;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const sort = this.props.settings.sort;
    const category = this.props.settings.category;
    const search = this.props.settings.search;
    const text = this.props.settings.search;

    if ((sort !== prevProps.settings.sort) || (category !== prevProps.settings.category) 
      || (search !== prevProps.settings.search) || (text !== prevProps.settings.text)) {
      this.setState({elements: []});
      this.loadFontData();
    }
  }

  checkCategory = (font) => {
    const category = this.props.settings.category;
    const filterType = this.props.settings.filterType;

    if (category === 'all') {
      return true;
    }

    if (category === 'stars') {
      const stars = this.props.stars;
      return (stars.indexOf(font.family) > -1);
    } else if (filterType === 'category') {
      return (font.category === category);
    } else if (filterType === 'suggestion') {
      const suggestions = this.state.suggestions[category];
      return (suggestions.indexOf(font.family) > -1);
    } else if (filterType === 'subset') {
      return (font.subsets.indexOf(category) > -1);
    }
  }

  setModal = (value) => {
    this.props.setModal(value);
  }

  setStars = (value) => {
    this.props.onChange(value);
  }

  buildElements = (start, end) => {
    let elements = [];

    if (end === 0) {
      return elements;
    }

    let fonts = [];
    const sort = this.props.settings.sort;
    const category = this.props.settings.category;
    const filterType = this.props.settings.filterType;
    const text = this.props.settings.text;
    const search = this.props.settings.search.toLowerCase().trim();
    let data = this.state.data[sort];
    const stars = this.props.stars;
    const that = this;

    if ((category !== "all") || search.length > 0) {
      data = data.filter(function(elem, i, arr) {
        let isCategory = true,
            isMatch = true;

        isCategory = that.checkCategory(elem);

        if (search.length > 0) {
          isMatch = (elem.family.toLowerCase().indexOf(search) !== -1);
        }

        return (isCategory && isMatch);
      });
    }

    if (data.length < end) {
      end = data.length;
    }

    for (let i = start; i < end; i++) {
      const font = data[i];
      const hasRegular = (font.variants.indexOf('regular') !== -1);
      //const hasLatin = ($.inArray('latin', font.variants) !== -1);
      let subsets = '';

      if (filterType === 'subset' && category !== 'latin') {
        if (font.subsets.indexOf('latin') !== -1) {
          subsets = ':latin,' + category;
        } else {
          subsets = ':' + category;
        }
      }

      if (hasRegular) {
        fonts.push(font.family + subsets);
      } else {
        fonts.push(font.family + ':' + font.variants[0] + subsets);
      }
    }

    this.setState({matchCount: fonts.length});

    if (fonts.length > 0) {
      WebFont.load({
        classes: false,
        google: {
          families: fonts
        }
      });

      elements.push(<Batch setModal={this.setModal} key={start} start={start} end={end} data={data} text={text} stars={stars} onChange={this.setStars} />)
    }

    return elements;
  }

  handleInfiniteLoad = () => {
    this.setState({
      isInfiniteLoading: true
    });
    setTimeout(() => {
      const groupSize = this.state.groupSize;
      const elemLength = this.state.elements.length * groupSize;
      const newElements = this.buildElements(elemLength, elemLength + groupSize);

      this.setState({
        isInfiniteLoading: false,
        elements: this.state.elements.concat(newElements)
      });
    }, 0);
  }

  elementInfiniteLoad() {
    return <div className="infinite-list-item"></div>;
  }

  render() {
    return (
      <Infinite className="fonts"
        height={window.innerHeight}
        dataLength={this.state.elements.length}
        next={this.handleInfiniteLoad}
        scrollThreshold={0.9}
        loader={this.elementInfiniteLoad()}
        hasMore={true}
      >
        {this.state.elements}
      </Infinite>
    );
  }
};

export default Fonts;