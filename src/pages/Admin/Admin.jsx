import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAppointment, deleteUser, getAppointmentsPaginated, getUsersPaginated, modifAppointment } from "../../services/ApiCalls";
import { userData } from "../userSlice";
import { Accordion } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import "./Admin.css"


export const Admin = () =>{

    const navigate = useNavigate();
    const userRdxData = useSelector(userData);
    const dispatch = useDispatch();

    const token = userRdxData.credentials.token;
    const decoded = userRdxData.credentials?.userData;

    const [Users, setUsers] = useState([]);
    const [usersPage, setUsersPage] = useState(1);
    const [usersSkip, setUsersSkip] = useState(3);
    const [usersCount, setUsersCount] = useState();

    const [Citas, setCitas] = useState([]);
    const [citasPage, setCitasPage] = useState(1);
    const [citasSkip, setCitasSkip] = useState(3);
    const [citasCount, setCitasCount] = useState();

    const [appointmentData, setAppointmentData] = useState({
        shift: "",
        date: ""
      });

    const [Modif, setModif] = useState(false);
    const [ModifCita, setModifCita] = useState(null);
    const [dateConfirmation, setDateConfirmation] = useState(false);


    useEffect(() => {
        if (decoded?.userRoles !== "admin") {
            navigate("/")

        } else {
            getUsersPaginated(token, usersPage, usersSkip).then((res)=> {
                setUsers(res.results);
                setUsersPage(res.page);
                setUsersSkip(res.skip);
                setUsersCount(res.count);
            })

            getAppointmentsPaginated(token, citasPage, citasSkip).then((res)=> {
                setCitas(res.results);
                setCitasPage(res.page);
                setCitasSkip(res.skip);
                setCitasCount(res.count);
               
            })
        }
      }, []);


    const buttonHandlerPrev = () => {
        if (usersPage <= 1) {
            null
        } else {
            const page = usersPage - 1;

            getUsersPaginated(token, page, usersSkip).then((res)=> {
                setUsers(res.results);
                setUsersPage(res.page);
                setUsersSkip(res.skip);
                setUsersCount(res.count);
            })
    
        };
    }

    const buttonHandlerPrevCitas = () => {
        if (citasPage <= 1) {
            null
        } else {
            const page = citasPage - 1;

            getAppointmentsPaginated(token, page, citasSkip).then((res)=> {
                setCitas(res.results);
                setCitasPage(res.page);
                setCitasSkip(res.skip);
                setCitasCount(res.count);
            })
    
        };
    }


    const buttonHandlerNext = () => {
        if (usersSkip * usersPage >= usersCount) {
            null
        } else {
            const page = usersPage + 1;

            getUsersPaginated(token, page, usersSkip).then((res)=> {
                setUsers(res.results);
                setUsersPage(res.page);
                setUsersSkip(res.skip);
                setUsersCount(res.count);
            })
    
        };
    }

    const buttonHandlerNextCitas = () => {
        if (citasSkip * citasPage >= citasCount) {
            null
        } else {
            const page = citasPage + 1;

            getAppointmentsPaginated(token, page, citasSkip).then((res)=> {
                setCitas(res.results);
                setCitasPage(res.page);
                setCitasSkip(res.skip);
                setCitasCount(res.count);
            })
    
        };
    }

    const buttonHandlerDeleteCitas = (i) => {
        const id = i;
        deleteAppointment(token, id).then((res)=> {
            setCitasCount(citasCount - 1);
            
            setTimeout(() => {
                setModif(!Modif)
                setModifCita(null)
                getAppointmentsPaginated(token, citasPage, citasSkip).then((res)=> {
                    setCitas(res.results);
                    setCitasPage(res.page);
                    setCitasSkip(res.skip);
                    setCitasCount(res.count);
                })
              }, 200); //Temporizador para recargar el componente con los citas actualizadas tras 200ms para que no sea demasiado brusco
        });
        
    };

    const buttonHandlerDeleteUsers = (i) => {
        const id = i;
        deleteUser(token, id).then((res)=> {
            setUsersCount(usersCount - 1);
            setTimeout(() => {
                getUsersPaginated(token, usersPage, usersSkip).then((res)=> {
                    setUsers(res.results);
                    setUsersPage(res.page);
                    setUsersSkip(res.skip);
                    setUsersCount(res.count);
                })
              }, 200); //Temporizador para recargar el componente con los usuarios actualizados tras 200ms para que no sea demasiado brusco
        });
    };

    const buttonHandlerModif = (id) => {
        setModif(!Modif);
        setDateConfirmation(false);

        if (ModifCita === null) {
            setModifCita(id);
        } else if (ModifCita !== null) {
            setModifCita(null)
        }
        
    }

    const dateHandler = (event) => {
        setAppointmentData((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }));
    };

    const shiftHandler = (e) => {
        const shift = e.shift;
        setAppointmentData((prevState) => ({
          ...prevState,
          "shift": shift
        }));

        if (appointmentData.date !== "") {
            setDateConfirmation(true)
        } else {
            null
        }
    };

    const buttonHandlerModifAppointment = (idCita) => {
        console.log(idCita);
        modifAppointment(token, idCita, appointmentData).then((res) => {
            setModifCita(null)
            setModif(!Modif)
            if (res.status === 202) {
                getAppointmentsPaginated(token, citasPage, citasSkip).then((res)=> {
                    setCitas(res.results);
                    setCitasPage(res.page);
                    setCitasSkip(res.skip);
                    setCitasCount(res.count);
                })
            } else if (res.status !== 202) {
                //futura gestión de errores por implementar
                alert("Error modificando la cita")
            }
        });

    };
    

    return (
        <div className="adminPage">
        <div className="pageTitle">
            <h1>GESTIÓN DEL ESTUDIO</h1>
        </div>
        <div className="usersDiv">
            <Accordion key="acc">
                <Accordion.Item key="item" eventKey="0">
                    <Accordion.Header key="header" className="headerAcc" >Usuarios de la app</Accordion.Header>
                    <Accordion.Body key="body" className="bodyAcc">
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
                   
                            {decoded?.userRoles === "admin" && Users[i]?.role.role_name !== "admin" ? (
                                <Button variant="danger" onClick={() => buttonHandlerDeleteUsers(Users[i]?.id)} >ELIMINAR USUARIO</Button>
                            ): null }
                            
                        </Card.Body>
                     </Card>
                    )})}

                        <div className="buttonsDivSip">
                            <div className="buttonPage"><Button variant="secondary"
                            onClick={() => buttonHandlerPrev()}>Prev Page</Button></div>
                            <div className="buttonPage"><Button variant="primary"
                            onClick={() => buttonHandlerNext()}>Next Page</Button></div>
                        </div>

                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>

        <div className="usersDiv">
            <Accordion key="acc">
                <Accordion.Item key="item" eventKey="0">
                    <Accordion.Header key="header" className="headerAcc" >Citas del estudio</Accordion.Header>
                    <Accordion.Body key="body" className="bodyAcc">
                    {Citas.map((cita, i)=>{
                    return (
                    <Card className="usercard" key={i} >
                        <Card.Body>
                            <Card.Title>{Citas[i]?.date}</Card.Title>
                            <Card.Text>Turno: 
                                {Citas[i]?.shift === "morning"? (
                                    " Mañana"
                                ):null}
                                {Citas[i]?.shift === "afternoon"? (
                                    " Tarde"
                                ):null}
                            </Card.Text>
                            <Card.Text>Artista: {Citas[i]?.artist.first_name}</Card.Text>
                            <Card.Text>Client: {Citas[i]?.client.first_name}</Card.Text>
                   
                            {decoded?.userRoles === "admin" ? (
                                <div className="buttonCitas">
                                    {Modif !== false? (
                                        
                                        <Button variant="secondary" onClick={() => buttonHandlerModif(Citas[i]?.id)}>ATRÁS</Button>
                                        
                                    ):null}
                                    {Modif === false? (
                                        <Button variant="success" onClick={() => buttonHandlerModif(Citas[i]?.id)}>MODIFICAR CITA</Button> 
                                    ):null}
                                
                                </div>
                            ): null }
                            
                            {Modif === true && ModifCita === Citas[i]?.id ? (
                            <div className="appointmentForm">
                                {dateConfirmation === false ? (
                                    <div className="appointmentForm">
                                    <Button variant="danger" onClick={() => buttonHandlerDeleteCitas(Citas[i]?.id)} >ELIMINAR CITA</Button>
                                    <Form.Group controlId="date">
                                        <Form.Control
                                            type="date"
                                            name="date"
                                            value={appointmentData.date}
                                            onChange={dateHandler}
                                        />
                                    </Form.Group>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        Turno?
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="bg-dropdown">
                                            <Dropdown.Item name="shift" value="morning" onClick={(e) => 
                                            shiftHandler({shift: e.target.getAttribute("value")
                                            })}
                                            >Mañana</Dropdown.Item>
                                            <Dropdown.Item name="shift" value="afternoon" onClick={(e) => 
                                            shiftHandler({shift: e.target.getAttribute("value")
                                            })}
                                            >Tarde</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    </div>
                                ): null}
                                {dateConfirmation === true ? (
                                    <div className="confirmModification">
                                        <h3 className="titleConfirmation">Modificar cita para el día {appointmentData.date} por la
                                                    {appointmentData.shift === "morning" ? (" mañana "): null}
                                                    {appointmentData.shift === "afternoon" ? (" tarde "): null}
                                                   
                                                </h3> 

                                                <Button variant="success" 
                                                onClick={() => buttonHandlerModifAppointment(Citas[i]?.id)} >Confirmar</Button>

                                    </div>
                                ): null}
                               
                            </div>

                            ) : null}

                        </Card.Body>
                     </Card>
                    )})}

                        <div className="buttonsDivSip">
                            <div className="buttonPage"><Button variant="secondary"
                            onClick={() => buttonHandlerPrevCitas()}
                            >Prev Page</Button></div>
                            <div className="buttonPage"><Button variant="primary"
                            onClick={() => buttonHandlerNextCitas()}
                            >Next Page</Button></div>
                        </div>

                    

                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    
    </div>
    )
}