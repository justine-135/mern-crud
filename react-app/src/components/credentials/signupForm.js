import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const [alert, setAlert] = useState(null);

  const handleFormInput = (e) => {
    const newForm = { ...form };
    newForm[e.target.id] = e.target.value;
    setForm(newForm);
    setAlert(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm_password) {
      setAlert("Password not the same.");
      return;
    }
    if (form.password.length <= 7) {
      setAlert("Password character must be greater than or equal to 8.");
      return;
    }
    await axios
      .post("/api/signup", {
        email: form.email,
        password: form.password,
      })
      .then(function (response) {
        console.log(response);
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error.response.data);
      })
      .finally(function () {
        setForm({ email: "", password: "" });
      });
  };

  return (
    <div className="credentials-container">
      <form
        onSubmit={(e) => {
          handleFormSubmit(e);
        }}
      >
        <h2>Signup here</h2>
        <input
          type="email"
          onChange={(e) => handleFormInput(e)}
          value={form.email}
          name="email"
          id="email"
          placeholder="Enter your email"
        />
        <input
          type="password"
          onChange={(e) => handleFormInput(e)}
          value={form.password}
          name="password"
          id="password"
          placeholder="Enter your password"
        />
        <input
          type="password"
          onChange={(e) => handleFormInput(e)}
          value={form.confirm_password}
          name="confirm_password"
          id="confirm_password"
          placeholder="Confirm password"
        />
        {alert && <p>{alert}</p>}

        <input type="submit" value="Signup" />
      </form>
    </div>
  );
};

export default SignupForm;
