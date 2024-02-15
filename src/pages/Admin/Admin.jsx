import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";


export const Admin = () =>{

    const navigate = useNavigate();
    const userRdxData = useSelector(userData);
    const dispatch = useDispatch();

    const token = userRdxData.credentials.token;
    const decoded = userRdxData.credentials?.userData;

    

    useEffect(() => {
        if (decoded?.userRoles !== "admin") {
            navigate("/")

        } else {
            console.log(token);

        }
           
      }, []);






    return (
        <>
        <h1>FUTURA FUNCIONALIDAD, DONDE SI TIENES PERFIL ADMIN, PUEDAS ACCEDER A ESTA VISTA Y REALIZAR CONSULTAS COMO ADMIN A LA BASE DE DATOS</h1>
        
        
        
        </>
    )
}