import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getArtists } from "../../services/ApiCalls";
import { userData } from "../userSlice";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { CustomInput } from "../../components/LoginInput/LoginImput";
import "./NuestrosArtistas.css"


export const NuestrosArtistas = () =>{
    const navigate = useNavigate();
    const userRdxData = useSelector(userData);
    const [Artists, setArtists] = useState([]);
    const [PedirCita, setPedirCita] = useState(0);


    const token = userRdxData.credentials.token;
    const id = userRdxData.credentials.userData?.userId;
    const decoded = userRdxData.credentials?.userData;

    useEffect(() => {
        getArtists().then((res) => {
            setArtists(res)
        })
      }, []);

    useEffect(() => {

        console.log( "Soy mis artistas ", Artists )
    },[Artists]);

    const buttonHandlerNewDate = (id) => {
        if (PedirCita > 0) {
            setPedirCita(0);
        } else if (PedirCita === 0) {
            setPedirCita(id)
        }
      }


    return (
        <div className="artistPage">
            <div className="pageTitle">
                <h1>ESTOS SON NUESTROS ARTISTAS</h1>
            </div>
            <div className="artistDiv">
                 {Artists.map((artist, i)=>{
                    return (
                        <Card className="artistcard" key={i} >
                            <Card.Img className="artistimg" variant="top" src={Artists[i]?.profile_image} />
                            <Card.Body className="bodyCard">
                                <div className="artistData">
                                <Card.Title>{Artists[i]?.first_name}</Card.Title>
                                <Card.Text>{Artists[i]?.last_name}</Card.Text>
                                <Card.Text>Tlf. contacto: {Artists[i]?.phone_number}</Card.Text>
                                <Card.Text>Estilo: {Artists[i]?.tattoo_style}</Card.Text>
                                {decoded?.userRoles === "client" && PedirCita === 0  ? (
                                    <Button variant="dark" onClick={() => buttonHandlerNewDate(Artists[i]?.id)}  >Pedir Cita</Button>
                                ): null }
                                {decoded?.userRoles === "client" && PedirCita !== 0 && PedirCita === Artists[i]?.id ? (
                                    <Button variant="dark" onClick={() => buttonHandlerNewDate(Artists[i]?.id)}  >Otra vez será</Button>
                                ): null }
                                </div>
                                {PedirCita !== 0 && PedirCita === Artists[i]?.id && decoded?.userRoles === "client"? (
                                    <div className="newAppoitnment">
                                        <div className="tituloNewAppoitnment">
                                            <h5>CUANDO QUIERES VENIR?</h5>
                                        </div>
                                        <div className="appointmentForm">
                                            <Form.Select aria-label="Default select example">
                                                <option>Por la mañana o por la tarde?</option>
                                                <option value="morning">Mañana</option>
                                                <option value="afternoon">Tarde</option>
                                            </Form.Select>
                                        </div>


                                    </div>


                                ): null }
                                
                            </Card.Body>
                         </Card>
                        )
                    })}
            </div>
        
        </div>
    )
}