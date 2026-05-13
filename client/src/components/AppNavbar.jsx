import { Navbar, Nav, Container, Button } from 'react-bootstrap';

function AppNavbar({ onWriteClick }) {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>

         {/* Brand / Logo */}
                <Navbar.Brand href="#">
                    📰 <strong>ThePost</strong> Blog
                </Navbar.Brand>

        {/* Hamburger menu for mobile */}
                <Navbar.Toggle aria-controls="nav-collapse" />

                <Navbar.Collapse id="nav-collapse">
                    <Nav className="me-auto">
                        <Nav.Link href="#">Home</Nav.Link>
                        <Nav.Link href="#">Tech</Nav.Link>
                        <Nav.Link href="#">World</Nav.Link>
                    </Nav>

          {/* Write Post button in Navbar */}
                    <Button
                        variant="outline-light"
                        size="sm"
                        onClick={onWriteClick}
                    >
                        ✍️ Write Post
                    </Button>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
}
export default AppNavbar;