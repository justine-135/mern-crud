import { useEffect } from "react";
import LoginForm from "../components/credentials/loginForm";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (loggedIn) {
  //     navigate("/");
  //     console.log("is loggde in");
  //   }
  // }, []);
  return (
    <div className="log-form-container">
      <LoginForm setLoggedIn={setLoggedIn} />
    </div>
  );
};

export default LoginPage;
