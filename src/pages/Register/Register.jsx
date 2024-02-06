import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomInput } from "../../components/LoginInput/LoginImput";
import { clientRegister, userLogin } from "../../services/ApiCalls";
import { userData } from "../userSlice";
import "./Register.css";

export const Register = () => {
  
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    phone_number: "",
  });

  // instancio redux en modo escritura
  const dispatch = useDispatch();

  // // instancio redux en modo lectura
  const userRdxData = useSelector(userData);

  const inputHandler = (event) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  
  const buttonHandler = () => {
    const credentials = {
        email: registerData.email,
        password: registerData.password,
    }
    clientRegister(registerData);

    //hacemos login con el usuario recien creado.
    userLogin(credentials)
      .then((token) => {
        const decodedToken = jwtDecode(token);

        const data = {
          token: token,
          userData: decodedToken,
        };
        //crear un slice coon un reducer de los datos de registro, no es necesario
        //pero seguimos usando el reducer de login para hcer login al usuario recién creado
        dispatch(login({ credentials: data }));
      })
      .catch((err) => console.error("ha ocurrido un error", err));
  };

  console.table(registerData);

  return (
    <div className="register">
      <CustomInput
        placeholder={"escriba un nickname"}
        type={"username"}
        name={"username"}
        handler={inputHandler}
      ></CustomInput>
      <CustomInput
        placeholder={"introduce tu email"}
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
      <CustomInput
        placeholder={"escriba su nombre"}
        type={"first_name"}
        name={"first_name"}
        handler={inputHandler}
      ></CustomInput>
      <CustomInput
        placeholder={"escriba su teléfono"}
        type={"phone_number"}
        name={"phone_number"}
        handler={inputHandler}
      ></CustomInput>

      <div className="apiCallButton" onClick={buttonHandler}>
        CREAR PERFIL!
      </div>
    </div>
  );
};
