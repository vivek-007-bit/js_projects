import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function certificates() {

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
      <div className="album py-5 bg-light" id='certificates'>
        <Container>
          <h2 className='mb-4 mt-5 border-bottom'>Certificates</h2>
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
                    <Card.Text><b>{certificates.title}</b></Card.Text>
                    <Card.Text><b>Issued By:</b> {certificates.issuedBy}</Card.Text>
                    <Card.Text><b>Year:</b> {certificates.year}</Card.Text>
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

export default certificates;





