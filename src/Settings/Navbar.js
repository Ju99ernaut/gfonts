// jshint ignore: start

const Navbar = ({ onClick }) => {
  return (
    <div className="nav">
      <button className="sidebar-open" onClick={onClick}>
        <i className="fa fa-bars"></i>
      </button>
      <a href="./"><img alt="logo" width="20px" src="favicon.svg"/></a>
    </div>
  );
};

export default Navbar;