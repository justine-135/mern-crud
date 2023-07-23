import "../styles/App.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import PostsPage from "../pages/postsPage";
import LoginPage from "../pages/loginPage";
import RequireAuth from "./RequireAuth";
import SignupPage from "../pages/signupPage";
import LogoutPage from "../pages/logoutPage";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            index
            element={
              <RequireAuth loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
                <PostsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/login"
            element={<LoginPage setLoggedIn={setLoggedIn} />}
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
