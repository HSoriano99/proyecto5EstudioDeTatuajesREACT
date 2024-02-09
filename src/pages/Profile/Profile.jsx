import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClientProfile } from "../../services/ApiCalls";
import { userData } from "../userSlice";


export const Profile = () =>{
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({});
    const [tokenData, setTokenData] = useState({});
    const userRdxData = useSelector(userData)
    const dispatch = useDispatch();
    

    const token = userRdxData.credentials.token;
    const id = userRdxData.credentials.userData.userId

     useEffect(() => {
        if (!token) {
            navigate("/register");
        } else {
            setTokenData((prevState)=>({
                ...prevState,
                [id]: id

            }))
            getClientProfile(token,id).then((res) => {
                console.table(res);
                setProfileData(res);
            })
        }
     }, []);

    //  useEffect(() => {

    //     if (!tokenData.id) {
    //         console.log("hola")
    //         navigate("/")
    //     }

    //  },[tokenData]);


   







    return (
        <div className="profileData">
            <h1>ESTOS SON LOS DETALLES DE TU PERFIL {profileData.first_name}</h1>
            <h2>-Nombre de usuario: {profileData.username}</h2>
            <h2>-Email: {profileData.email}</h2>
            <h2>-Teléfono: {profileData.phone_number}</h2>

        </div>
    )
}