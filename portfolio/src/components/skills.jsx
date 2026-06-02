import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function skills() {

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
      text: 'Creating responsive and visually appealing user interfaces using CSS, Flexbox, Grid, and modern styling techniques.'
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

  return (
    <>
      <Container className="px-4 py-5" id="icon-grid">
        <h1 className="pb-2 mt-5 border-bottom" id='skills'>Skills</h1>
        <Row xs={1} sm={2} md={2} lg={2} className="g-3 py-5">
          {skills.map(skills => (
            <Col key={skills.id} className="d-flex g-3">
              <Card className="card-hover shadow-lg card-hover rounded p-2 d-flex g-3 w-100" style={{ border: "solid rgba(0, 0, 0, 0.175) 1px", flexDirection: "row"}}>
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
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default skills;





