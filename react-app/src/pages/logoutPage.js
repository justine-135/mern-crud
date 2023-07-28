import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const LogoutPage = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn]);

  useEffect(() => {
    logout();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/logout");
      navigate("/login");
      setLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  return <div>LogoutPage</div>;
};

export default LogoutPage;
