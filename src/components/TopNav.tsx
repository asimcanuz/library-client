import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import useLogout from "../hooks/useLogout";

const TopNav = () => {
  const { auth } = useContext(AuthContext);
  const isLoggedIn = auth.accessToken;

  const navigate = useNavigate();
  const logout = useLogout();

  async function handleLogout() {
    console.log("Logging out");
    await logout();
    navigate("/")
  }


  return (
    <Navbar
      sticky="top"
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ">
            <Nav.Item>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </Nav.Item>
            {isLoggedIn ? (
              <>
                <Nav.Item>
                  <Link to="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/admin" className="nav-link">
                    Admin
                  </Link>
                </Nav.Item>
              </>
            ) : (
              <></>
            )}
          </Nav>
          <Nav>
            {!isLoggedIn ? (
              <Nav.Item>
                <Link to="/login" className="nav-link">
                  <Button variant="primary">Login</Button>
                </Link>
              </Nav.Item>
            ) : (
              <></>
            )}
            {isLoggedIn ? (
              <Nav.Item>
                <Button variant="danger" onClick={() => handleLogout()}>
                  Logout
                </Button>
              </Nav.Item>
            ) : (
              <></>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default TopNav;
