// jshint ignore: start

import $ from 'cash-dom';
import Preview from './Preview';
import Meta from './Meta';

const Font = ({ setModal, font, text, stars, onChange, num }) => {
  const modal = () => {
    setModal(font);
  };

  const setStar = (e) => {
    e.stopPropagation();

    const target = $(e.target);
    const { family } = font;

    let index = stars.indexOf(family);

    if (index < 0) {
      stars.push(family);
      target.addClass('fa-star').removeClass('fa-star-o');
    } else {
      stars.splice(index, 1);
      target.addClass('fa-star-o').removeClass('fa-star');
    }

    onChange(stars);
  };

  const starred = stars.includes(font.family) ? 'fa star fa-star' : 'fa star fa-star-o';

  return (
    <div className="font">
      <div className="content" onClick={modal} >
        <Preview font={font} text={text} />
        <span onClick={setStar} className={starred}></span>
        <Meta font={font} num={num} />
      </div>
    </div>
  );
};

export default Font;