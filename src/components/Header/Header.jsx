
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";


export const Header = () => {

    //hardcodeamos nuestro token y decoded token para probar los diferentes enlaces
    const token = "";
    const decoded = {

    };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" id="navbar">
      <Container>
        <Navbar.Brand href="">Héctor´s Tattoo Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/artistas">Nuestros Artistas</Nav.Link>
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
                  <NavDropdown.Item>
                    Log out
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item href="profile">Perfil</NavDropdown.Item>
                  <NavDropdown.Item href="">Mis citas</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
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


//function onClick de dropdown Logout
// onClick={() => logMeOut()}