import { useEffect } from "react";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getArtistProfile, getClientProfile, updateArtist, updateClient, updateUser } from "../../services/ApiCalls";
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
  const [artistUpdate, setArtistUpdate] = useState ({first_name: "", last_name: "", 
  phone_number: "", tattoo_style: ""});
  const userRdxData = useSelector(userData);
  const dispatch = useDispatch();

  const [Citas, setCitas] = useState(false)
  const [citasPage, setCitasPage] = useState(1);
  const [citasSkip, setCitasSkip] = useState(3);
  const [citasCount, setCitasCount] = useState();

  const token = userRdxData.credentials.token;
  const id = userRdxData.credentials.userData?.userId;
  const decoded = userRdxData.credentials?.userData;
  

  useEffect(() => {
    if (!token) {
      navigate("/register");
    } else if (decoded?.userRoles === "client" || decoded?.userRoles === "admin"){
      getClientProfile(token, id, citasPage, citasSkip).then((res) => {
        setProfileData(res);
        setCitasPage(res.page);
        setCitasSkip(res.skip);
        setCitasCount(res.count);
        if (res.results?.length > 0) {
          setCitas(true)
        }
      });
    } else {
      getArtistProfile(token, id, citasPage, citasSkip).then((res) => {
        setProfileData(res);
        setCitasPage(res.page);
        setCitasSkip(res.skip);
        setCitasCount(res.count);
        if (res.results?.length > 0) {
          setCitas(true)
        }
      })
    }
  }, []);

  const buttonHandlerPrevCitas = () => {
    if (citasPage <= 1) {
        null
    } else if (decoded?.userRoles === "client" || decoded?.userRoles === "admin"){
        const page = citasPage - 1;

        getClientProfile(token, id, page, citasSkip).then((res) => {
          setProfileData(res);
          setCitasPage(res.page);
          setCitasSkip(res.skip);
          setCitasCount(res.count);
          if (res.results?.length > 0) {
            setCitas(true)
          }
        });

    } else {
      const page = citasPage - 1;

      getArtistProfile(token, id, page, citasSkip).then((res) => {
        setProfileData(res);
        setCitasPage(res.page);
        setCitasSkip(res.skip);
        setCitasCount(res.count);
        if (res.results?.length > 0) {
          setCitas(true)
        }
      })
    }
  }

  const buttonHandlerNextCitas = () => {
    if (citasSkip * citasPage >= citasCount) {
        null
    } else if (decoded?.userRoles === "client" || decoded?.userRoles === "admin"){
        const page = citasPage + 1;

        getClientProfile(token, id, page, citasSkip).then((res) => {
          setProfileData(res);
          setCitasPage(res.page);
          setCitasSkip(res.skip);
          setCitasCount(res.count);
          if (res.results?.length > 0) {
            setCitas(true)
          }
        });
    } else {
      const page = citasPage + 1;

      getArtistProfile(token, id, page, citasSkip).then((res) => {
        setProfileData(res);
        setCitasPage(res.page);
        setCitasSkip(res.skip);
        setCitasCount(res.count);
        if (res.results?.length > 0) {
          setCitas(true)
        }
      })
    }
}
   

  const buttonHandlerEdit = () => {
    setEditable(!Editable);
  }

  const buttonHandlerSave = () => {

    if (decoded?.userRoles === "client" || decoded?.userRoles === "admin") {
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


    } else {
       //Gestionar que no se envien claves vacías a la llamada.

    userUpdate.username = userUpdate.username || profileData.username,
    userUpdate.email = userUpdate.email || profileData.email,

    artistUpdate.first_name = artistUpdate.first_name || profileData.first_name,
    artistUpdate.last_name = artistUpdate.last_name || profileData.last_name,
    artistUpdate.phone_number = artistUpdate.phone_number || profileData.phone_number,
    artistUpdate.tattoo_style = artistUpdate.tattoo_style || profileData.tattoo_style,

    //----------------------------------------------------------------

    updateUser(token, id, userUpdate).then((res) => {
      setProfileData((prevState) => ({
        ...prevState,
        username: userUpdate.username || profileData.username,
        email: userUpdate.email || profileData.email,
      }))
    });

    updateArtist(token, id, artistUpdate).then((res) => {
      setProfileData((prevState) => ({
        ...prevState,
        first_name: artistUpdate.first_name || profileData.first_name,
        last_name: artistUpdate.last_name || profileData.last_name,
        phone_number: artistUpdate.phone_number || profileData.phone_number,
        tattoo_style: artistUpdate.tattoo_style || profileData.tattoo_style,
      }))
    });

    setEditable(false);

    }
  }

  const inputHandlerUser = (event) => {
    setUserUpdate((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

  };

  const inputHandlerClientArtist = (event) => {
    if (decoded?.userRoles === "client" || decoded?.userRoles === "admin") {
      setClientUpdate((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
          }));
    }else {
      setArtistUpdate((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));

    }

  };

  return (
    <div className="profileData">
        <Card>
          {decoded?.userRoles === "admin"? (
            <Card.Header as="h5">Estos son los datos de tu perfil de administrador 
            { " " + profileData.first_name}
            </Card.Header>
          ):
            <Card.Header as="h5">Estos son los datos de tu perfil 
            { " " + profileData.first_name}
            </Card.Header>
          }
            <Card.Body>
                <Card.Title>{profileData.username}</Card.Title>
                <Card.Text>Nombre: {profileData.first_name}</Card.Text>
                {profileData.last_name? (
                   <Card.Text>Apellido: {profileData.last_name}</Card.Text>
                )
                : null}
                 {profileData.tattoo_style? (
                   <Card.Text>Estilo: {profileData.tattoo_style}</Card.Text>
                )
                : null}
                <Card.Text>Email: {profileData.email}</Card.Text>
                <Card.Text>Teléfono: {profileData.phone_number}</Card.Text>
                <Button variant="dark" onClick={() => buttonHandlerEdit()}>Editar mis datos</Button>
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
                  <CustomInput
                    placeholder={"escriba su nombre"}
                    type={"first_name"}
                    name={"first_name"}
                    handler={inputHandlerClientArtist}
                  ></CustomInput>
                  {profileData.tattoo_style? (
                   <CustomInput
                   placeholder={"escriba su estilo de tatuaje"}
                   type={"tattoo_style"}
                   name={"tattoo_style"}
                   handler={inputHandlerClientArtist}
                 ></CustomInput>
                  )
                  : null}
                  
                  <CustomInput
                    placeholder={"escriba su apellido"}
                    type={"last_name"}
                    name={"last_name"}
                    handler={inputHandlerClientArtist}
                  ></CustomInput>
                  <CustomInput
                    placeholder={"escriba su teléfono"}
                    type={"phone_number"}
                    name={"phone_number"}
                    handler={inputHandlerClientArtist}
                  ></CustomInput>
                  <br></br>
                  <Button variant="dark" onClick={() => buttonHandlerSave()} >Guardar cambios</Button>
                </div>

                ) : null }
                

            </Card.Body>
        </Card>

      <br></br>

      {decoded?.userRoles === "client" ? (
        <div className="newCitaButton">
        <Button className="buttonCita" variant="success" href="/artists" >Crea una cita nueva!</Button>
        </div>
      ): null}

      {decoded?.userRoles === "admin" ? (
        <div className="newCitaButton">
        <Button className="buttonCita" variant="success" href="/admin" >ACCEDE A GESTIÓN DEL ESTUDIO</Button>
        </div>
      ): null}

      <br></br>

      {Citas === true && decoded?.userRoles !== "admin"? (
        <div className="citasDiv">
        <Accordion key="acc" >
          <Accordion.Item key="item" eventKey="0">
            <Accordion.Header key="header" >Mis Citas</Accordion.Header>
            <Accordion.Body key="body">
              {decoded?.userRoles === "client" ? (
                 <div className="citasCards">
                 {profileData.results.map((appointment, index) => {
                   return (
                    <div className="cita" key={"cita" + index}>
                     <ListGroup>
                       <ListGroup.Item key="nombre" >
                         Artista: {profileData.results[index]?.artist.first_name}
                       </ListGroup.Item>
                       <ListGroup.Item key="fecha">
                         Fecha: {profileData.results[index]?.date}
                       </ListGroup.Item>
                       <ListGroup.Item key="turno">
                         Turno: {profileData.results[index]?.shift}
                       </ListGroup.Item>
                       <ListGroup.Item key="estilo">
                         Tatuaje: {profileData.results[index]?.artist.tattoo_style}
                       </ListGroup.Item>
                     </ListGroup>
                     <br></br>
                     </div>
                   );
                 })}
                 
                 </div>

              ) : null}
              {decoded?.userRoles === "artist" ? (
                 <div className="citasCards">
                 {profileData.results.map((appointment, index) => {
                   return (
                    <div className="cita" key={"cita" + index}>
                     <ListGroup key={"cita" + index}>
                       <ListGroup.Item key="nombre" >
                         Cliente: {profileData.results[index]?.client.first_name}
                       </ListGroup.Item>
                       <ListGroup.Item key="clientPhone">
                         Tlf. cliente: {profileData.results[index]?.client.phone_number}
                       </ListGroup.Item>
                       <ListGroup.Item key="fecha">
                         Fecha: {profileData.results[index]?.date}
                       </ListGroup.Item>
                       <ListGroup.Item key="turno">
                         Turno: {profileData.results[index]?.shift}
                       </ListGroup.Item>
                     </ListGroup>
                     <br></br>
                     </div>
                   );
                 })}
                 </div>

              ) : null}

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
      ) : null}
    </div>
  );
};
