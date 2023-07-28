import { useEffect } from "react";
import LoginForm from "../components/credentials/loginForm";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginPage = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("email") !== undefined) {
      navigate("/");
    }
  }, []);
  return (
    <div className="log-form-container">
      <LoginForm setLoggedIn={setLoggedIn} />
    </div>
  );
};

export default LoginPage;
