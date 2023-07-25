import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const [alert, setAlert] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleFormInput = (e) => {
    const newForm = { ...form };
    newForm[e.target.id] = e.target.value;
    setForm(newForm);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/login", form).then(function (response) {
        console.log(response);
        setLoggedIn(true);
        setAlert(null);
        navigate("/");
      });
    } catch (error) {
      setAlert(true);
    }

    setForm({ email: "", password: "" });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleFormSubmit(e);
        }}
      >
        <h2>Login here</h2>
        <input
          type="text"
          onChange={(e) => handleFormInput(e)}
          value={form.email}
          name="email"
          id="email"
        />
        <input
          type="password"
          onChange={(e) => handleFormInput(e)}
          value={form.password}
          name="password"
          id="password"
        />
        <input type="submit" value="Login" />
      </form>
      {alert && <p>User not found.</p>}
    </div>
  );
};

export default LoginForm;
