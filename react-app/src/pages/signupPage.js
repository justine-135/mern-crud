import SignupForm from "../components/credentials/signupForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignupPage = ({ loggedIn }) => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (loggedIn) {
  //     navigate("/");
  //   }
  // }, []);
  return (
    <div className="log-form-container">
      <SignupForm />
    </div>
  );
};

export default SignupPage;
