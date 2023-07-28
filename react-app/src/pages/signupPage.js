import SignupForm from "../components/credentials/signupForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

const SignupPage = ({ loggedIn }) => {
  const navigate = useNavigate();

  // const navigate = useNavigate();
  useEffect(() => {
    if (Cookies.get("email") !== undefined) {
      navigate("/");
    }
  }, []);
  return (
    <div className="log-form-container">
      <SignupForm />
    </div>
  );
};

export default SignupPage;
