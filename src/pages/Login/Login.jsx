import { useState } from "react";
import { CustomInput } from "../../components/LoginInput/LoginImput";
import { userLogin } from "../../services/ApiCalls";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css"
import Button from "react-bootstrap/Button";

export const Login = () => {
    const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // instancio redux en modo escritura
  const dispatch = useDispatch();

  // instancio redux en modo lectura
  const userRdxData = useSelector(userData);

  const inputHandler = (event) => {
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const buttonHandler = () => {
    userLogin(credentials)
      .then((token) => {
        const decodedToken = jwtDecode(token);

        const data = {
          token: token,
          userData: decodedToken,
        };
        dispatch(login({ credentials: data }));
        navigate("/profile");
      })
      .catch((err) => console.error("ha ocurrido un error", err));
  };

  return (
    
    <div className="LoginDiv">

      <div className="TituloLogin">
        <h1>INICIA TU SESIÓN</h1>
      </div>

      <br></br>

      <div className="LoginForm">
        <CustomInput
        placeholder={"escriba su email"}
        type={"email"}
        name={"email"}
        handler={inputHandler}
      ></CustomInput>

      <CustomInput
        placeholder={"escriba su contraseña"}
        type={"password"}
        name={"password"}
        handler={inputHandler}
      ></CustomInput>
      </div>
      <br></br>
      <Button variant="dark" onClick={() => buttonHandler()} >LOG IN</Button>
      
    </div>
  );
};
