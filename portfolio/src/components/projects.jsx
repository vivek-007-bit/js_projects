import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Projects() {

  const cards = [
    {
      id: 1,
      img: '/project1.png',
      text: `<h4>Handwriting2Text</h4>A ML project that converts handwritten images into digital text using neural networks and image processing.`,
      techStack: ['JavaScript', 'Python'],
      link: 'https://img2text-tesseractjs.onrender.com/',
      github: 'https://github.com/vivek-007-bit/js_projects/tree/main/Image2Text_tesseratjs',
    },
    {
      id: 2,
      img: '/project2.png',
      text: `<h4>SocialSphere</h4>A full-stack Facebook-inspired social media application with secure authentication, interactive user features for improved user engagement.`,
      techStack: ['PHP', 'MySQL', 'JavaScript', 'Python'],
      link: 'https://facebook-m0pv.onrender.com/login.php',
      github: 'https://github.com/vivek-007-bit/php_projects/tree/main/facebook',
    },
    {
      id: 3,
      img: '/project3.png',
      text: `<h4>Nextweather</h4>A weather application that provides real time weather data using OpenWeather API and forecasts weather using Machine Learing algorithms`,
      techStack: ['JavaScript', 'Python'],
      link: 'https://nextweather7.netlify.app/',
      github: 'https://github.com/vivek-007-bit/js_projects/tree/main/NextWeather',
    },
    {
      id: 4,
      img: '/project3.png',
      text: `<h4>My Diary</h4>An online journaling application with secure login/signup authentication and full CRUD functionality, allowing users to create, edit, manage, and organize their personal journal entries efficiently.`,
      techStack: ['PHP', 'MySQL', 'JavaScript'],
      link: 'https://diary-app-4k8w.onrender.com/',
      github: 'https://github.com/vivek-007-bit/php_projects/tree/main/diary-app',
    },
  ];

  return (
    <div className="album py-5">
      <Container>
        <h2 className='mb-4 mt-5 border-bottom'>Projects</h2>
        <Row xs={1} sm={2} md={3} className="g-3">
          {cards.map(card => (
            <Col key={card.id}>
              <Card className="shadow-sm card-hover">
                <Card.Img
                  variant="top"
                  src={card.img}
                  alt={`Card ${card.id}`}
                  height={225}
                  style={{ objectFit: 'cover' }}
                />
                <Card.Body>
                  <div
                    dangerouslySetInnerHTML={{ __html: card.text }}
                  />
                  <div className="mb-3">
                    <h6 className='mb-2 mt-4'>Tech Stack</h6>
                    {card.techStack.map((tech, index) => (
                      <Button
                        key={index}
                        variant="dark"
                        size="sm"
                        className="me-2 mb-2"
                        disabled
                      >
                        {tech}
                      </Button>
                    ))}
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <Button variant="outline-primary" size="sm" href={card.link}
                        target="_blank"
                        rel="noopener noreferrer">
                        View
                      </Button>
                      <Button variant="outline-success" size="sm" href={card.github}
                        target="_blank"
                        rel="noopener noreferrer">Github</Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Projects;
