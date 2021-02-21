// jshint ignore: start

const Navbar = ({ onClick }) => {
  return (
    <div className="nav">
      <button className="sidebar-open" onClick={onClick}>
        <i className="fa fa-bars"></i>
      </button>
      <div><a href="./">GFonts</a></div>
    </div>
  );
};

export default Navbar;