import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext/AuthContext";

const Navbar = () => {
  const { token, setToken } = useAuth();

  const linkStyles = {
    textDecoration: "none",
    color: "#000",
    padding: 5,
  };

  const renderConditionallyLogInOrLogOut = token ? (
    <>
      <Link to="/" onClick={() => setToken(null)} style={linkStyles}>
        {" "}
        Log Out
      </Link>
      <Link to="/posts" style={linkStyles}>
        Posts
      </Link>
      <Link to="/create/post" style={linkStyles}>
        Create Post
      </Link>
    </>
  ) : (
    <Link to="/login" style={linkStyles}>
      Login
    </Link>
  );
  return (
    <nav
      style={{ margin: 10, display: "flex", justifyContent: "space-around" }}
    >
      <Link to="/" style={linkStyles}>
        Home
      </Link>
      {token ? null : (
        <Link to="/register" style={linkStyles}>
          Register
        </Link>
      )}

      {renderConditionallyLogInOrLogOut}
    </nav>
  );
};

export default Navbar;
