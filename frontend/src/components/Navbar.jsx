import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authApi";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const handleLogout = () =>{
     logoutUser().catch(()=>{}).finally(()=>{
       dispatch(logout());
       navigate("/login");
     })
  }

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">
      <Link to="/" className="font-bold text-lg">
        GigFlow
      </Link>

      <div className="flex gap-4 items-center">
        {!isAuth && (
          <>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {isAuth && (
          <>
            <Link to="/">Home</Link>
            <Link to="/gigs">Gigs</Link>
            <Link to="/my-gigs">My Gigs</Link>
            <Link to="/my-bids">My Bids</Link>

            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded cursor-pointer"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
