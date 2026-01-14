import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/slices/authSlice";
import { getCurrentUser } from "./api/authApi";
import Register from "./../src/pages/register";
import Login from "./../src/pages/login";
import { Home } from "./pages/home";
import GigList from "./pages/gigs/Giglist";
import CreateGig from "./pages/gigs/CreateGig";
import GigDetails from "./pages/gigs/GigDetails";
import MyGigs from "./pages/gigs/MyGigs";
import ViewBids from "./pages/bids/ViewBids";
import MyBids from "./pages/bids/MyBids";

import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser()
      .then(res => {
        if (res?.data?.id) {
          dispatch(loginSuccess(res.data));
        }
      })
      .catch(() => {});
  }, []);
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/gigs"
          element={
            <ProtectedRoute>
              {/* <Home /> */}
              <GigList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-gigs"
          element={
            <ProtectedRoute>
              <MyGigs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gigs/:gigId/bids"
          element={
            <ProtectedRoute>
              <ViewBids />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bids"
          element={
            <ProtectedRoute>
              <MyBids />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gigs/create"
          element={
            <ProtectedRoute>
              <CreateGig />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gigs/:id"
          element={
            <ProtectedRoute>
              <GigDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
