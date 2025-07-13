import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/">🏠 Home</Link>
      {user ? (
        <>
          <Link to="/create">✍️ Create Post</Link>
          <Link to="/dashboard">📋 Dashboard</Link>
          <button onClick={logout}>🚪 Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">🔐 Login</Link>
          <Link to="/register">📝 Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;