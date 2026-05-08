import { Container, Row, Col, Card, Button } from 'react-bootstrap';

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
  const skills = [
    {
      id: 1,
      img: '/1.png',
      title: 'HTML',
      text: 'Building clean and well-structured web pages using HTML with a focus on accessibility and responsive design.'
    },
    {
      id: 2,
      img: '/2.png',
      title: 'CSS',
      text: 'Enjoy creating responsive and visually appealing user interfaces using CSS, Flexbox, Grid, and modern styling techniques.'
    },
    {
      id: 3,
      img: '/3.png',
      title: 'JavaScript',
      text: 'Skilled in using JavaScript to add interactivity, dynamic functionality, and smooth user experiences to web applications.'
    },
    {
      id: 5,
      img: '/4.png',
      title: 'PHP',
      text: 'Experienced in developing backend functionality with PHP and building data-driven web applications.'
    },
    {
      id: 6,
      img: '/5.png',
      title: 'MySQL',
      text: 'Familiar with managing and working with MySQL databases for storing, organizing, and retrieving application data efficiently.'
    },
    {
      id: 7,
      img: '/6.png',
      title: 'Python',
      text: 'Python for exploring machine learning and backend development projects.'
    },
  ];


  const certificates = [
    {
      id: 1,
      img: '/certificate1.jpg',
      title: 'Python Skill Up',
      issuedBy: 'GeekForGeeks',
      year: '2025',
    },
    {
      id: 2,
      img: '/certificate2.jpg',
      title: 'CyberSecurity',
      issuedBy: 'SkillIndia',
      year: '2025',
    },
  ];

  return (
    <>
      <Container className="py-5" id='about'>
        <h2 className="pb-2 mt-4 border-bottom"></h2>
        <Row className="flex-lg-row-reverse align-items-center g-5 py-5">
          <Col xs={10} sm={8} lg={6}>
            <img
              src="/profile-pic.jpg"
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width="500"
              height="500"
              loading="lazy"
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
              <Button variant="outline-warning" size="lg" className="px-4 me-md-2">
                <a href="/cv.pdf" className='text-decoration-none text-dark fw-bold' target="_blank" rel="noopener noreferrer"> Download Resume</a>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="bg-light">
        <Container className="px-4 py-5" id="education">
          <h2 className="pb-2 border-bottom">Education</h2>
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



      <Container className="px-4 py-5" id="icon-grid">
        <h2 className="pb-2 border-bottom" id='skills'>Skills</h2>
        <Row xs={1} sm={2} md={3} lg={3} className="g-4 py-5">
          {skills.map(skills => (
            <Col key={skills.id} className="d-flex align-items-start shadow-lg card-hover rounded p-2">
              <img
                src={skills.img}
                alt={skills.title}
                width={48}
                height={48}
                className="flex-shrink-0 me-2"
                style={{ objectFit: 'cover', borderRadius: '8px' }}
              />
              <div>
                <h3 className="fw-bold mb-0 fs-4 m-2">{skills.title}</h3>
                <p>{skills.text}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <div className="album py-5 bg-light" id='certificates'>
        <Container>
          <h2 className='mb-3 border-bottom'>Certificates</h2>
          <Row xs={1} sm={2} md={3} className="g-3 justify-content-center">
            {certificates.map(certificates => (
              <Col key={certificates.id}>
                <Card className="shadow-sm card-hover">
                  <Card.Img
                    variant="top"
                    src={certificates.img}
                    alt={`certificates ${certificates.id}`}
                    height={260}
                  />
                  <Card.Body>
                    <Card.Text>{certificates.title}</Card.Text>
                    <Card.Text>Issued By: {certificates.issuedBy}</Card.Text>
                    <Card.Text>Year: {certificates.year}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
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





