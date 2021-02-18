// jshint ignore: start

import $ from 'cash-dom';

const Categories = ({ onClick }) => {
  const setCategory = (event) => {
    const target = $(event.target);
    const value = target.attr("data-val");
    const type = target.attr("data-type");
    onClick({category: value, filterType: type});

    $(".categories .btn, .dropdown-toggle").removeClass("active");
    target.addClass("active");

    if (target.attr("data-type") === 'subset') {
      target.closest(".dropdown")
        .find(".dropdown-menu").toggle();
      target.closest(".dropdown")
        .find(".dropdown-toggle").addClass("active")
        .find(".selected").text(event.target.textContent);
    }
  }

  const toggleDropdown = (e) => {
    $(e.target).closest(".dropdown").children(".dropdown-menu").toggle();
  }

  return (
    <div className="categories">
      <div>
        <h2>Category</h2>
        <span onClick={setCategory} className="btn active" data-type="category" data-val="all">All</span>
        <span onClick={setCategory} className="btn" data-type="category" data-val="sans-serif">Sans-Serif</span>
        <span onClick={setCategory} className="btn" data-type="category" data-val="serif">Serif</span>
        <span onClick={setCategory} className="btn" data-type="category" data-val="display">Display</span>
        <span onClick={setCategory} className="btn" data-type="category" data-val="handwriting">Handwriting</span>
        <span onClick={setCategory} className="btn" data-type="category" data-val="monospace">Monospace</span>
        <span onClick={setCategory} className="btn" data-type="category" data-val="stars"><i className="fa fa-star"></i></span>
      </div>
      <div>
        <h2>Suggestions</h2>
        <span onClick={setCategory} className="btn" data-type="suggestion" data-val="paragraphs">Paragraphs</span>
        <span onClick={setCategory} className="btn" data-type="suggestion" data-val="headings">Headings</span>
      </div>
      <div>
        <h2>Subset</h2>
        <span className="dropdown">
          <div onClick={toggleDropdown} className="dropdown-toggle">
            <span className="selected">Latin</span> <i className="fa fa-caret-down"></i>
          </div>
          <div className="dropdown-menu">
            <span onClick={setCategory} className="btn" data-type="subset" data-val="arabic">Arabic</span>
            <span onClick={setCategory} className="btn" data-type="subset" data-val="cyrillic">Cyrillic</span>
            <span onClick={setCategory} className="btn" data-type="subset" data-val="cyrillic-ext">Cyrillic Extended</span>
            <span onClick={setCategory} className="btn" data-type="subset" data-val="devanagari">Devanagari</span>
            <span onClick={setCategory} className="btn" data-type="subset" data-val="greek">Greek</span>
            <span onClick={setCategory} className="btn" data-type="subset" data-val="greek-ext">Greek Extended</span>
            <span onClick={setCategory} className="btn" data-type="subset" data-val="hebrew">Hebrew</span>
            <span onClick={setCategory} className="btn" data-type="subset" data-val="khmer">Khmer</span>
            <span onClick={setCategory} className="btn" data-type="subset" data-val="latin">Latin</span>
            <span onClick={setCategory} className="btn" data-type="subset" data-val="latin-ext">Latin Extended</span>
            <span onClick={setCategory} className="btn" data-type="subset" data-val="tamil">Tamil</span>
            <span onClick={setCategory} className="btn" data-type="subset" data-val="telugu">Telugu</span>
            <span onClick={setCategory} className="btn" data-type="subset" data-val="thai">Thai</span>
            <span onClick={setCategory} className="btn" data-type="subset" data-val="vietnamese">Vietnamese</span>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Categories;