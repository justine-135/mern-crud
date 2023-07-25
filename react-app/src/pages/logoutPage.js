import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const LogoutPage = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const logout = async () => {
      try {
        await axios
          .get("/api/logout")
          .then(function (response) {
            console.log(response);
            navigate("/login");
            setLoggedIn(false);
          })
          .catch(function (error) {
            console.log(error.response.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    logout();
  }, [navigate]);

  return <div>LogoutPage</div>;
};

export default LogoutPage;
