import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="fixed-top"
      style={{
        backgroundColor: '#000000',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
      }}
      variant="dark"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className='d-flex justify-content-center align-items-center'>
          <img
            alt="fav-icon"
            src="/fav-icon.jpg"
            width="40"
            height="40"
            className="d-inline-block align-top"
          />{' '}
          Vivek Sharma
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className='p-3 rounded'>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link href="#skills">Skills</Nav.Link> 
            <Nav.Link href="#certificates">Certificates</Nav.Link>
            <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

