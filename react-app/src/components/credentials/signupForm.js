import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
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
    await axios
      .post("/api/signup", form)
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
    <div>
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
        />
        <input
          type="password"
          onChange={(e) => handleFormInput(e)}
          value={form.password}
          name="password"
          id="password"
        />
        <input type="submit" value="Signup" />
      </form>
    </div>
  );
};

export default SignupForm;
