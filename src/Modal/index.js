// jshint ignore: start

import React from 'react';
import $ from 'cash-dom';
import ClipboardButton from 'react-clipboard.js';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.refMdl = React.createRef();
    this.state = {
      variants: '',
      subsets: ''
    };
  }

  componentDidMount() {
    $(document).on('keyup', (e) => {
      if (e.keyCode === 27) {
        this.fade();
      }
    });

    $('.modal input[type=text]').on('click', function() {
      $(this).get(0).select();
    });
  }

  fade = (e) => {
    if ((!e) || (e && $(e.target).hasClass('modal'))) {
      $(this.refMdl.current).removeClass('show');
      this.setState({variants: '', subsets: ''});
    }
  }

  setVariants = (e) => {
    let variants = [];
    $('.variants input:checked').each(function() {
      variants.push($(this).val());
    });

    this.setState({'variants': variants.join(',')});
  }

  setSubsets = (e) => {
    let subsets = [];
    $('.subsets input:checked').each(function() {
      subsets.push($(this).val());
    });

    this.setState({'subsets': subsets.join(',')});
  }

  setStar = (e) => {
    const target = $(e.target);
    const stars = this.props.stars;
    const family = this.props.font.family;

    const index = stars.indexOf(family);

    if (index < 0) {
      stars.push(family);
      target.addClass('fa-star').removeClass('fa-star-o');
    } else {
      stars.splice(index, 1);
      target.addClass('fa-star-o').removeClass('fa-star');
    }

    this.props.onChange(stars);
  }

  render() {
    const that = this;
    const font = this.props.font;
    const family = font.family.replace(/ /g, '+');
    let url = 'https://fonts.googleapis.com/css?family=' + family;
    let category = font.category;
    const stars = this.props.stars;
    const starred = stars.includes(font.family) ? 'fa star fa-star' : 'fa star fa-star-o';

    if (category === 'display' || category === 'handwriting') {
      category = 'cursive';
    }

    if (this.state.variants.length > 0) {
      url = url + ':' + this.state.variants;
    }

    if (this.state.subsets.length > 0) {
      url = url + '&subset=' + this.state.subsets;
    }

    const value =  '\'' + font.family + '\', ' + category;
    const html = '<link href=\'' + url + '\' rel=\'stylesheet\' type=\'text/css\'>';
    const css = '@import url(' + url + ');';
    const rule = 'font-family: ' + value + ';';
    const google = 'https://fonts.google.com/specimen/' + family;
    const title = {fontFamily: value};

    const variants = font.variants.map(function(variant, i) {
      let slug = variant;
      let style = '';
      let fontStyle = 'normal';
      let fontWeight = '400';
      const labels = {
        100: 'Thin',
        200: 'Extra-Light',
        300: 'Light',
        400: 'Normal',
        500: 'Medium',
        600: 'Semi-Bold',
        700: 'Bold',
        800: 'Extra-Bold',
        900: 'Ultra-Bold'
      };

      if (slug === 'regular') {
        slug = '400';
      } else if (slug === 'italic') {
        slug = '400italic';
        style = 'Italic';
        fontStyle = 'italic';
      } else if (slug.length === 3) {
        fontWeight = slug;
      } else {
        style = 'Italic';
        fontStyle = 'italic';
        fontWeight = slug.substring(0, 3);
      }

      return {
        label: labels[fontWeight],
        slug: slug,
        style: style,
        weight: fontWeight,
        css: {
          fontFamily: value,
          fontStyle: fontStyle,
          fontWeight: fontWeight
        }
      };
    });

    return (
      <div className="modal" ref={this.refMdl} onClick={this.fade} >
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans" />
        <div className="modal-inner">
          <h1 style={title}><a target="_blank" rel="noreferrer" href={google}>{font.family}</a><span onClick={this.setStar} className={starred}></span></h1>
          <div>
            <p>
              <ClipboardButton data-clipboard-text={html}>
                <span className="copy" title="Copy to Clipboard"><i className="fa fa-clipboard"></i></span>
              </ClipboardButton>
              <input type="text" readOnly onClick={this.select} value={html} />
            </p>
            <p>
              <ClipboardButton data-clipboard-text={css}>
                <span className="copy" title="Copy to Clipboard"><i className="fa fa-clipboard"></i></span>
              </ClipboardButton>
              <input type="text" readOnly onClick={this.select} value={css} />
            </p>
            <p>
              <ClipboardButton data-clipboard-text={rule}>
                <span className="copy" title="Copy to Clipboard"><i className="fa fa-clipboard"></i></span>
              </ClipboardButton>
              <input type="text" readOnly onClick={this.select} value={rule} />
            </p>
          </div>
          <div className="variants">
            <h2>Styles</h2>
            {variants.map(function(variant, i) {
              return  <div key={variant.slug}>
                        <input type="checkbox" id={variant.slug} value={variant.slug} defaultChecked={false} onClick={that.setVariants} />
                        <label htmlFor={variant.slug} style={variant.css} >{variant.label} {variant.weight} {variant.style}</label>
                      </div>;
            })}
          </div>
          <div className="subsets">
            <h2>Subsets</h2>
            {font.subsets.sort().map(function(subset, i) {
              return  <div key={subset}>
                        <input type="checkbox" id={subset} value={subset} defaultChecked={false} onClick={that.setSubsets} />
                        <label htmlFor={subset}>{subset}</label>
                      </div>
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default Modal;