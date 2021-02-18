// jshint ignore: start

import $ from 'cash-dom';
import Font from './Font';

const Batch = ({ setModal, stars, onChange, start, end, data }) => {
  const modal = (value) => {
    setModal(value);
  }
  const setStars = (value) => {
    onChange(value);
  };

  const text = $('.text input').val();
  let fonts = data.slice(start, end);
  let children = [];

  while (fonts.length > 0) {
    const font = fonts.shift();
    children.push(<Font setModal={modal} key={fonts.length} font={font} text={text} stars={stars} onChange={setStars} />);
  }

  return (
    <div className="fontgroup">
      {children}
    </div>
  );
};

export default Batch;