import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const LogoutPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    logout();
  }, []);

  const logout = async () => {
    await axios
      .get("/api/logout")
      .then(function (response) {
        console.log(response);
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };
  return <div>LogoutPage</div>;
};

export default LogoutPage;
