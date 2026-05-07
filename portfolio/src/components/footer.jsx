import { Container, Nav } from "react-bootstrap";

function Footer() {
  return (
    <footer className="py-4 border-top bg-light">
      <Container className="d-flex flex-column align-items-center justify-content-center text-center">
        {/* Brand and copyright */}
        <div className="mb-3 d-flex align-items-center justify-content-center">
          <a
            href="/"
            className="me-2 text-body-secondary text-decoration-none lh-1"
            aria-label="Portfolio"
          >
            <svg className="bi" width="30" height="24" aria-hidden="true">
              <use xlinkHref="#bootstrap" />
            </svg>
          </a>
          <span className="text-body-secondary">© 2026 Vivek Sharma</span>
        </div>

        {/* Social icons */}
        <Nav className="justify-content-center">
          <Nav.Item>
            <Nav.Link
              href="https://github.com/vivek-007-bit"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-body-secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                className="bi bi-github"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2 .37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.57 7.57 0 012 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              href="https://www.linkedin.com/in/vivek-sharma-dev7/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-body-secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                className="bi bi-linkedin"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.356-.554 1.356-1.247-.015-.708-.519-1.246-1.341-1.246-.822 0-1.356.538-1.356 1.246 0 .693.519 1.247 1.327 1.247h.014zm4.908 8.212V9.359c0-.213.015-.426.078-.579.171-.426.562-.868 1.218-.868.859 0 1.202.655 1.202 1.615v3.913h2.401V9.28c0-2.22-1.182-3.25-2.757-3.25-1.27 0-1.845.707-2.165 1.205h.015v-1.036H6.65c.03.678 0 7.225 0 7.225h2.401z" />
              </svg>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </footer>
  );
}

export default Footer;
