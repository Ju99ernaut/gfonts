// jshint ignore: start

import $ from 'cash-dom';

const Display = ({ onClick }) => {
  const changeDisplay = (event) => {
    const btn = $(event.target);

    if (!btn.hasClass("active")) {
      const value = event.target.getAttribute('data-value').toLowerCase();
      const groupSize = (value === 'grid') ? 900 : 3600;

      onClick({display: value});
      onClick({groupSize: groupSize});

      $(".btn[data-value]").removeClass("active");
      btn.addClass("active");
      $('body').toggleClass('row');
    }
  }

  const changeSize = (event) => {
    const size = $(event.target).val() + 'px';
    $('.fonts').css('font-size', size);
    $('.size').text(size);
  }

  const invert = (event) => {
    $(event.target).toggleClass("active");
    $("body").toggleClass("invert");
  }

  return (
    <div className="display">
      <div>
        <h2>Display</h2>
        <span onClick={changeDisplay} data-value="grid" className="btn btn-grid active" title="Switch to Grid">
          <i className="fa fa-th"></i>
        </span>
        <span onClick={changeDisplay} data-value="row" className="btn btn-row" title="Switch to List">
          <i className="fa fa-align-justify"></i>
        </span>
        <span onClick={invert} className="btn" title="Invert Colors">
          <i className="fa fa-adjust"></i>
        </span>
      </div>
      <div>
        <span className="size">30px</span>
        <h2>Preview Size</h2>
        <input type="range" defaultValue="30" min="10" max="80" onChange={changeSize} />
      </div>
    </div>
  );
};

export default Display;