import { useState } from "react";
import { CustomInput } from "../../components/LoginInput/LoginImput";
import { userLogin } from "../../services/ApiCalls";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";

export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // instancio redux en modo escritura
  const dispatch = useDispatch();

  // // instancio redux en modo lectura
// const userRdxData = useSelector(userData)

  const inputHandler = (event) => {
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const buttonHandler = () => {
    console.log(credentials);
    userLogin(credentials)
      .then((token) => {
        const decodedToken = jwtDecode(token);

        const data = {
          token: token,
          userData: decodedToken,
        };
        dispatch(login({ credentials: data }));
      })
      .catch((err) => console.error("ha ocurrido un error", err));
  };

 
  return (
    <div>
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
      
      <div className="apiCallButton" onClick={buttonHandler}>LOGIN</div>
    </div>
  );
};
