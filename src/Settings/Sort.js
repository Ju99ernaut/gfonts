// jshint ignore: start

import $ from 'cash-dom';

const Sort = ({ onClick }) => {
  const sort = (event) => {
    const value = event.target.textContent.toLowerCase();
    const btn = $(event.target);

    if (!btn.hasClass("active")) {
      $(".sort .btn").removeClass("active");
      btn.addClass("active");
      onClick({sort: value});
    }
  }

  return (
    <div className="sort">
      <h2>Sort</h2>
      <span onClick={sort} className="btn active">Popularity</span>
      <span onClick={sort} className="btn">Alpha</span>
      <span onClick={sort} className="btn">Date</span>
      <span onClick={sort} className="btn">Style</span>
    </div>
  );
};

export default Sort;