// jshint ignore: start

import $ from 'cash-dom';
import Search from './Search';
import Categories from './Categories';
import Sort from './Sort';
import Display from './Display';
import Sample from './Sample';
import About from './About';

const Settings = ({ onChange }) => {
  const changeSetting = (setting) => {
    onChange(setting);
  }

  const closeDropdown = (e) => {
    const target = $(e.target);

    if (target.hasClass('dropdown-toggle') || target.closest('.dropdown').length === 1) {
      return;
    }

    $('.dropdown-menu').hide();
  }

  const height = { height: window.innerHeight + "px" };

  return (
    <div onClick={closeDropdown} className="settings" style={height}>
      <h1><a href="./">GFonts</a></h1>
      <Search onChange={changeSetting} />
      <Categories onClick={changeSetting} />
      <hr/>
      <Sort onClick={changeSetting} />
      <Display onClick={changeSetting} />
      <Sample onChange={changeSetting} />
      <hr/>
      <About />
    </div>
  );
};

export default Settings;