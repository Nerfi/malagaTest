import { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext/AuthContext";

//interface
interface LoginForm {
  name: string;
  password: string;
}

const apiUrl = process.env.REACT_APP_API_URL! + "/login";

const Login = () => {
  const [loginState, setLogin] = useState<LoginForm>({
    name: "",
    password: "",
  });
  //function para setear el token si tenemos una respuesta exitosa
  const { setToken } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: loginState.name,
          password: loginState.password,
        }),
      });

      if (response.ok) {
        // Request successful, do something with the response
        const data = await response.json();
        //localStorage.setItem("token", data.token);
        setToken(data && data.token);
        navigate("/");
      } else {
        // Request failed, handle the error
        throw new Error("Request failed");
      }
    } catch (error: any) {
      // Handle the error
      throw new Error(error.message);
    }

    // limpiando estado
    setLogin({
      name: "",
      password: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLogin((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  //add validations

  return (
    <div className="appForm">
      <div className="loginForm">
        <div className="title">Login</div>
        <form onSubmit={handleSubmit}>
          <div className="inputContainer">
            <label>Username </label>
            <input
              type="text"
              name="name"
              value={loginState.name}
              required
              onChange={handleChange}
              placeholder="name"
            />
          </div>
          <div className="inputContainer">
            <label>Password </label>
            <input
              type="password"
              name="password"
              value={loginState.password}
              required
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <div className="buttonContainer">
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
