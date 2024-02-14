import { useEffect } from "react";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getClientProfile, updateClient, updateUser } from "../../services/ApiCalls";
import { userData } from "../userSlice";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { CustomInput } from "../../components/LoginInput/LoginImput";
import "./Profile.css";


export const Profile = () => {
  const navigate = useNavigate();
  const [Editable, setEditable] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [userUpdate, setUserUpdate] = useState({username: "", email: ""});
  const [clientUpdate, setClientUpdate] = useState ({first_name: "", last_name: "", phone_number: ""});
  const userRdxData = useSelector(userData);
  const dispatch = useDispatch();

  const token = userRdxData.credentials.token;
  const id = userRdxData.credentials.userData?.userId;

  useEffect(() => {
    if (!token) {
      navigate("/register");
    } else {
      getClientProfile(token, id).then((res) => {
        setProfileData(res);
      });
    }
  }, []);
   
  useEffect(()=>{
    console.log(profileData)
  },[profileData])

  const buttonHandlerEdit = () => {
    setEditable(!Editable);
  }

  const buttonHandlerSave = () => {
    //Gestionar que no se envien claves vacías a la llamada.

    userUpdate.username = userUpdate.username || profileData.username,
    userUpdate.email = userUpdate.email || profileData.email,

    clientUpdate.first_name = clientUpdate.first_name || profileData.first_name,
    clientUpdate.last_name = clientUpdate.last_name || profileData.last_name,
    clientUpdate.phone_number = clientUpdate.phone_number || profileData.phone_number,

    //----------------------------------------------------------------

    updateUser(token, id, userUpdate).then((res) => {
      setProfileData((prevState) => ({
        ...prevState,
        username: userUpdate.username || profileData.username,
        email: userUpdate.email || profileData.email,
      }))
    });

    updateClient(token, id, clientUpdate).then((res) => {
      setProfileData((prevState) => ({
        ...prevState,
        first_name: clientUpdate.first_name || profileData.first_name,
        last_name: clientUpdate.last_name || profileData.last_name,
        phone_number: clientUpdate.phone_number || profileData.phone_number,
      }))
    });

    setEditable(false);

  }

  const inputHandlerUser = (event) => {

    setUserUpdate((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

  };

  const inputHandlerClient = (event) => {

    setClientUpdate((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

  };

  return (
    <div className="profileData">
        <Card>
            <Card.Header as="h5">Estos son los datos de tu perfil <br></br>
            {profileData.first_name}
            </Card.Header>
            <Card.Body>
                <Card.Title>{profileData.username}</Card.Title>
                <Card.Text>Nombre: {profileData.first_name}</Card.Text>
                {profileData.last_name? (
                   <Card.Text>Apellido: {profileData.last_name}</Card.Text>
                )
                : null}
                <Card.Text>Email: {profileData.email}</Card.Text>
                <Card.Text>Teléfono: {profileData.phone_number}</Card.Text>
                <Button variant="primary" onClick={() => buttonHandlerEdit()}>Editar mis datos</Button>
                {Editable 
                ? (
                  
                  <div className="EditingData">
                    <br></br>
                  <CustomInput
                    placeholder={"escriba su username"}
                    type={"username"}
                    name={"username"}
                    handler={inputHandlerUser}
                  ></CustomInput>
                  <CustomInput
                    placeholder={"escriba su email"}
                    type={"email"}
                    name={"email"}
                    handler={inputHandlerUser}
                  ></CustomInput>
                  <br></br>
                  <CustomInput
                    placeholder={"escriba su nombre"}
                    type={"first_name"}
                    name={"first_name"}
                    handler={inputHandlerClient}
                  ></CustomInput>
                  <CustomInput
                    placeholder={"escriba su apellido"}
                    type={"last_name"}
                    name={"last_name"}
                    handler={inputHandlerClient}
                  ></CustomInput>
                  <CustomInput
                    placeholder={"escriba su teléfono"}
                    type={"phone_number"}
                    name={"phone_number"}
                    handler={inputHandlerClient}
                  ></CustomInput>
                  <br></br>
                  <Button variant="secondary" onClick={() => buttonHandlerSave()} >Guardar cambios</Button>
                </div>

                ) : null }
                

            </Card.Body>
        </Card>

      <br></br>
      {profileData.appointment ? (
        <Accordion key="acc" defaultActiveKey="0">
          <Accordion.Item key="item" eventKey="0">
            <Accordion.Header key="header">Mis Citas</Accordion.Header>
            <Accordion.Body key="body">
              <>
                {profileData.appointment.map((appointment, index) => {
                  return (
                    <ListGroup horizontal key={"cita" + index}>
                      <ListGroup.Item key="nombre" >
                        {profileData.appointment[index]?.artist.first_name}
                      </ListGroup.Item>
                      <ListGroup.Item key="fecha">
                        {profileData.appointment[index]?.date}
                      </ListGroup.Item>
                      <ListGroup.Item key="turno">
                        {profileData.appointment[index]?.shift}
                      </ListGroup.Item>
                      <ListGroup.Item key="estilo">
                        {profileData.appointment[index]?.artist.tattoo_style}
                      </ListGroup.Item>
                    </ListGroup>
                  );
                })}
              </>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ) : null}
    </div>
  );
};
