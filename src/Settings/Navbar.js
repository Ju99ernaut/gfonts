// jshint ignore: start

const Navbar = ({ onClick }) => {
  return (
    <div className="nav">
      <span>
        <button className="sidebar-open" onClick={onClick}>
          <i className="fa fa-bars"></i>
        </button>
        <a href="./"><img alt="logo" width="20px" src="favicon.svg"/></a>
      </span>
      <span>
        <a href="http://github.com/Ju99ernaut/gfonts/">
          <i className="fa fa-github"></i>
        </a>
        <a href="https://twitter.com/Ju99ern4ut">
          <i className="fa fa-twitter"></i>
        </a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=https://gfonts.blocomposer.com">
          <i className="fa fa-facebook"></i>
        </a>
      </span>
    </div>
  );
};

export default Navbar;