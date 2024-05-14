import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import useLogout from "../hooks/useLogout";


const TopNav = () => {
  const { auth } = useContext(AuthContext);
  const isLoggedIn = auth.accessToken ? true : false;
  const isAdmin = auth.role?.includes("ROLE_ADMIN");

  const navigate = useNavigate();
  const logout = useLogout();

  async function handleLogout() {
    console.log("Logging out");
    await logout();
    navigate("/");
  }

  return (
    <Navbar
      sticky="top"
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          Navbar
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ">
            <Nav.Item>
              <Nav.Link as={Link} to={"/"}>
                Home
              </Nav.Link>
            </Nav.Item>
            {isLoggedIn ? (
              <>
                <Nav.Item>
                  {NavLinkByRole()}
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to={"/books"}>
                    Books
                  </Nav.Link>
                </Nav.Item>

                {isAdmin ? (
                  <Nav.Item>
                    <Nav.Link as={Link} to={"/admin"}>
                      Admin
                    </Nav.Link>
                  </Nav.Item>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </Nav>
          <Nav>
            {!isLoggedIn ? (
              <>
                <Nav.Item>
                  <Link to="/login" className="nav-link">
                    <Button variant="primary">Login</Button>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/register" className="nav-link">
                    <Button variant="success">Register</Button>
                  </Link>
                </Nav.Item>
              </>
            ) : (
              <></>
            )}
            {isLoggedIn ? (
              <NavDropdown title={auth.username} >
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                
                <NavDropdown.Divider />
                  <NavDropdown.Item className="d-grid" >
                    <Button variant="danger" onClick={handleLogout}>
                    Logout
                  </Button>
                  </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <></>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

function NavLinkByRole() {
  // rollün içerdiği rollerin sayfalarını döndürür
  const { auth } = useContext(AuthContext);
  const roles = auth.role;
  return roles?.map((role) => {
    role = role.replace("ROLE_", "").toLowerCase();
    return (
      <Nav.Item key={role}>
        <Nav.Link as={Link} to={"/" + role+"/dasboard"}>
          {role.toUpperCase + " Dashboard"}
        </Nav.Link>
      </Nav.Item>
    )
  }); 
  
}

export default TopNav;
