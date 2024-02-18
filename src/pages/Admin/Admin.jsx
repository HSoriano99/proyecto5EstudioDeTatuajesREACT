import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsersPaginated } from "../../services/ApiCalls";
import { userData } from "../userSlice";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./Admin.css"


export const Admin = () =>{

    const navigate = useNavigate();
    const userRdxData = useSelector(userData);
    const dispatch = useDispatch();

    const token = userRdxData.credentials.token;
    const decoded = userRdxData.credentials?.userData;

    const [Users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [skip, setSkip] = useState(3);
    const [count, setCount] = useState();


    useEffect(() => {
        if (decoded?.userRoles !== "admin") {
            navigate("/")

        } else {
            getUsersPaginated(token, page, skip).then((res)=> {
                console.log(res)
                setUsers(res.results);
                setPage(res.page);
                setSkip(res.skip);
                setCount(res.count);
            })
        }
      }, []);






    return (
        <div className="adminPage">
        <div className="pageTitle">
            <h1>GESTIÓN DEL ESTUDIO</h1>
        </div>
        <div className="usersDiv">
             {Users.map((user, i)=>{
                return (
                    <Card className="usercard" key={i} >
                        <Card.Body>
                            <Card.Title>{Users[i]?.username}</Card.Title>
                            <Card.Text>Usuario:
                                {Users[i]?.role.role_name === "client" ? (
                                    " Cliente"
                                ):null}
                                {Users[i]?.role.role_name === "artist" ? (
                                    " Tatuador"
                                ):null}
                            </Card.Text>
                            <Card.Text>Email: {Users[i]?.email}</Card.Text>
                            {Users[i]?.client !== null ? (
                                         <Card.Text>Tlf. contacto: {Users[i]?.client.phone_number}</Card.Text>
                            ): null}
                            {Users[i]?.artist !== null ? (
                                         <Card.Text>Tlf. contacto: {Users[i]?.artist.phone_number}</Card.Text>
                            ): null}
                   
                            {decoded?.userRoles === "admin" ? (
                                <Button variant="dark">BORRAR USUARIO</Button>
                            ): null }
                            
                        </Card.Body>
                     </Card>
                    )
                })}
        </div>
    
    </div>
    )
}