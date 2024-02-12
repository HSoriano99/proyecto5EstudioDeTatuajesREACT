import { useEffect } from "react";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClientProfile } from "../../services/ApiCalls";
import { userData } from "../userSlice";

export const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [tokenData, setTokenData] = useState({});
  const userRdxData = useSelector(userData);
  const dispatch = useDispatch();

  const token = userRdxData.credentials.token;
  const id = userRdxData.credentials.userData?.userId;

  useEffect(() => {
    if (!token) {
      navigate("/register");
    } else {
      setTokenData((prevState) => ({
        ...prevState,
        [id]: id,
      }));
      getClientProfile(token, id).then((res) => {
        setProfileData(res);
      });
    }
  }, []);

  return (
    <div className="profileData">
      <h1>ESTOS SON LOS DETALLES DE TU PERFIL {profileData.first_name}</h1>
      <h2>-Nombre de usuario: {profileData.username}</h2>
      <h2>-Email: {profileData.email}</h2>
      <h2>-Teléfono: {profileData.phone_number}</h2>
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
