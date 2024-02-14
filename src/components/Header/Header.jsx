
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../../pages/userSlice";


export const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userRdxData = useSelector(userData)

  const token = userRdxData.credentials.token;
  const decoded = userRdxData.credentials.userData;

  const logMeOut = () => {
    dispatch(logout({credentials: {}}))
    setTimeout(() => {
      navigate("/");
    });
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" id="navbar">
      <Container>
        <Navbar.Brand href="">Héctor´s Tattoo Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/artists">Nuestros Artistas</Nav.Link>
            <NavDropdown title="Mi cuenta" id="basic-nav-dropdown">
              {!token ? (
                <>
                  <NavDropdown.Item href="/login ">Login</NavDropdown.Item>
                  <NavDropdown.Item href="register">
                    Resgistrarse
                  </NavDropdown.Item>
                </>
              ) : decoded.role === "ADMIN" ? (
                <>
                  <NavDropdown.Item href="profile">Perfil</NavDropdown.Item>
                  <NavDropdown.Item href="admin">Admin</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logMeOut()}>
                    Log out
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item href="profile">Perfil</NavDropdown.Item>
                  {/* <NavDropdown.Item href="">Mis citas</NavDropdown.Item> */}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logMeOut()}>
                    Log out
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

