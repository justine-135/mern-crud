import LoginForm from "../components/credentials/loginForm";

const LoginPage = ({ setLoggedIn }) => {
  return (
    <div>
      <LoginForm setLoggedIn={setLoggedIn} />
    </div>
  );
};

export default LoginPage;
