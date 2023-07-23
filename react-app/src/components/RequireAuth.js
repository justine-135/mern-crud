import axios from "axios";
import { Navigate } from "react-router-dom";

const RequireAuth = (props) => {
  const checkAuth = async () => {
    try {
      await axios.get("/api/check-auth").then(function (response) {
        props.setLoggedIn(true);
      });
    } catch (error) {
      console.log(error.response);
      props.setLoggedIn(false);
    }
  };

  checkAuth();
  if (props.loggedIn === null) {
    return <div>Loading</div>;
  }

  if (props.loggedIn === false) {
    return <Navigate to="/login" />;
  }

  return <div>{props.children}</div>;
};

export default RequireAuth;
