import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomInput } from "../../components/LoginInput/LoginImput";
import { clientRegister, userLogin } from "../../services/ApiCalls";
import { login, userData } from "../userSlice";
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
    //definimos las credenciales para el futuro login con los datos de registro
    const credentials = {
      email: registerData.email,
      password: registerData.password,
    };

    clientRegister(registerData).then(() => {

    //hacemos login con el usuario recien creado cuando tengamos la respuesta de nuestro registro
    userLogin(credentials)
      .then((token) => {
        const decodedToken = jwtDecode(token);

        const data = {
          token: token,
          userData: decodedToken,
        };
        //guardamos al igual que en el login nuestros datos de usuario logeado 
        dispatch(login({ credentials: data }));
      })
      .catch((err) => console.error("ha ocurrido un error", err));
    });

   
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
