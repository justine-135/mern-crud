import "../styles/App.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import PostsPage from "../pages/postsPage";
import LoginPage from "../pages/loginPage";
import SignupPage from "../pages/signupPage";
import LogoutPage from "../pages/logoutPage";
import UserPostsPage from "../pages/userPostsPage";
import PostPage from "../pages/postPage";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/api/check-auth").then(function (response) {
          setLoggedIn(true);
        });
      } catch (error) {
        setLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="App">
      <Router>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {Cookies.get("email") === undefined ? (
              <div>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </div>
            ) : (
              <div>
                <li>
                  <Link to="/myposts">My posts</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </div>
            )}
          </ul>
        </nav>
        <Routes>
          <Route index element={<PostsPage />} />
          <Route path="/:id" element={<PostPage />} />

          <Route path="/myposts" element={<UserPostsPage />} />
          <Route
            path="/login"
            element={
              <LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            }
          />
          <Route path="/signup" element={<SignupPage loggedIn={loggedIn} />} />
          <Route
            path="/logout"
            element={
              <LogoutPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
