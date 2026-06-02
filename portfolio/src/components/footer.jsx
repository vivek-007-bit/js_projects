import { Container } from "react-bootstrap";
import SocialLinks from '../components/socialLinks';

function Footer() {
  return (
    <footer className=" border-top bg-light">
      <Container className="d-flex flex-column align-items-center justify-content-center text-center py-2">
        <div className="mb-3 d-flex align-items-center justify-content-center" style={{flexDirection: "column"}}>
          <span className="text-body-secondary">© 2026 Vivek Sharma</span>
          <SocialLinks />
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
