import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Projects() {
  const cards = [
    {
      id: 1,
      img: '/project1.webp',
      text: 'A machine learning project that converts handwritten text into digital text using neural networks and image processing techniques for accurate character recognition.',
      techStack: ['Python', 'JavaScript'],
      link: 'https://img2text-tesseractjs.onrender.com/',
      github: 'https://github.com/vivek-007-bit/js_projects/tree/main/Image2Text_tesseratjs',
    },
    {
      id: 2,
      img: '/project2.png',
      text: 'A full-stack Facebook-inspired social media application with secure authentication, interactive user features for improved user engagement.',
      techStack: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'Cloudinary API'],
      link: 'https://facebook-m0pv.onrender.com',
      github: 'https://github.com/vivek-007-bit/php_projects/tree/main/facebook',
    },
    {
      id: 3,
      img: '/project3.webp',
      text: 'An online journaling application with secure login/signup authentication and full CRUD functionality, allowing users to create, edit, manage, and organize their personal journal entries efficiently.',
      techStack: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
      link: 'https://diary-app-4k8w.onrender.com/',
      github: 'https://github.com/vivek-007-bit/php_projects/tree/main/diary-app',
    },
    {
      id: 4,
      img: '/project4.png',
      text: 'A responsive weather application that provides real-time weather forecasts with live location detection, allowing users to instantly view accurate weather updates for their current location or searched cities.',
      techStack: [ 'Bootstrap', 'Weather API', 'JavaScript'],
      link: 'https://nextweather7.netlify.app/',
      github: 'https://github.com/vivek-007-bit/js_projects/tree/main/NextWeather',
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
                  <Card.Text>{card.text}</Card.Text>
                  <div className="mb-3">
                  <h6 className='mb-4 mt-5'>Tech Stack</h6>
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
