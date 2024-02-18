import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsersPaginated } from "../../services/ApiCalls";
import { userData } from "../userSlice";


export const Admin = () =>{

    const navigate = useNavigate();
    const userRdxData = useSelector(userData);
    const dispatch = useDispatch();

    const token = userRdxData.credentials.token;
    const decoded = userRdxData.credentials?.userData;

    const page = 1;
    const skip = 3;

    useEffect(() => {
        if (decoded?.userRoles !== "admin") {
            navigate("/")

        } else {
            getUsersPaginated(token, page, skip).then((res)=> {
                console.log(res)
            })
        }
      }, []);






    return (
        <>
        <h1>FUTURA FUNCIONALIDAD, DONDE SI TIENES PERFIL ADMIN, PUEDAS ACCEDER A ESTA VISTA Y REALIZAR CONSULTAS COMO ADMIN A LA BASE DE DATOS</h1>
        
        
        
        </>
    )
}