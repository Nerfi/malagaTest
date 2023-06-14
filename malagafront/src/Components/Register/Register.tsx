import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
  name: string;
}

const apiUrl = process.env.REACT_APP_API_URL! + "/register";

const Register = () => {
  const [register, setRegister] = useState<LoginForm>({
    email: "",
    password: "",
    name: " ",
  });

  //navigation
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegister((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      //make request to register
      const registerUser = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: register.name.trim(),
          email: register.email.trim(),
          password: register.password.trim(),
        }),
      });

      if (registerUser.ok) {
        navigate("/");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <div className="appForm">
      <div className="loginForm">
        <div className="title">Register</div>
        <form onSubmit={handleSubmit}>
          <div className="inputContainer">
            <label>Name </label>
            <input
              type="text"
              name="name"
              value={register.name}
              required
              onChange={handleChange}
              placeholder="Name"
            />
          </div>

          <div className="inputContainer">
            <label>Email </label>
            <input
              type="email"
              name="email"
              value={register.email}
              required
              onChange={handleChange}
              placeholder="Email"
            />
          </div>

          <div className="inputContainer">
            <label>Password </label>
            <input
              type="password"
              name="password"
              value={register.password}
              required
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
