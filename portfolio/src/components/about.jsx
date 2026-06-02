import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import SocialLinks from '../components/socialLinks';

function about() {

  const educationData = [
    {
      id: 1,
      title: "Bachelor of Science in Data Science",
      institution: "Inspiria Knowledge Campus",
      scoreLabel: "SGPA",
      score: "8.29 (3rd Semester)",
      year: "2024 - Present",
    },
    {
      id: 2,
      title: "Class XII (CBSE)",
      institution: "Siliguri Model High School",
      scoreLabel: "Percentage",
      score: "82.6",
      year: "2023",
    },
    {
      id: 3,
      title: "Class X (CBSE)",
      institution: "Siliguri Model High School",
      scoreLabel: "Percentage",
      score: "89.6",
      year: "2021",
    },
  ];

  return (
    <>
      <Container className="py-1" id='about'>
        <h2 className="pb-1 mt-4 border-bottom"></h2>
        <Row className="flex-lg-row-reverse align-items-center g-5 py-5">
          <Col xs={10} sm={8} lg={6}>
            <img
              src="/profile-pic.jpg"
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width="500"
              height="500"
              loading="lazy"
              style={{ border: "Solid black 1px", borderRadius: "5px" }}
            />
          </Col>
          <Col lg={6}>
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              About Me
            </h1>
            <p className="lead">
              I am a <b>B.Sc. in Data Science</b> student with an interest in
              <b> Machine Learning</b> and <b>Web Development</b>. I enjoy creating
              modern web applications that are interactive, user-friendly, and tailored
              to individual user needs. I like combining technology and
              creativity to build digital experiences that are both practical and engaging.
            </p>


            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <SocialLinks />
              <Button variant="outline-warning" size="lg" className="px-4 me-md-2">
                <a href="/Vivek_Sharma_resume_final.pdf" className='text-decoration-none text-dark fw-bold' target="_blank" rel="noopener noreferrer"> Download CV</a>
              </Button>
            </div>

          </Col>
        </Row>
      </Container >

      <div className="bg-light">
        <Container className="px-4 py-1" id="education">
          <h1 className="pb-2 border-bottom">Education</h1>
          <Row className="g-4 py-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
            {educationData.map((edu) => (
              <Col key={edu.id}>
                <Card className="shadow-lg border-0 h-100 card-hover">
                  <Card.Body>
                    <Card.Title className="fs-5 fw-bold">{edu.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {edu.institution}
                    </Card.Subtitle>
                    <div className="d-flex justify-content-between mt-3">
                      <small>
                        <b>{edu.scoreLabel}: {edu.score}</b>
                      </small>
                      <small>{edu.year}</small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default about;





