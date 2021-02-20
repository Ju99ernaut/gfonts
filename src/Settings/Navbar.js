// jshint ignore: start

const Navbar = ({ onClick }) => {
  return (
    <div className="nav">
      <button className="sidebar-open" onClick={onClick}>
        <i className="fa fa-bars" style={{ fontSize: '25px' }}></i>
      </button>
      <p><a href="./">GFonts</a></p>
    </div>
  );
};

export default Navbar;