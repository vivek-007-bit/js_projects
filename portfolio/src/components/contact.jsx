import React, { useRef } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import emailjs from '@emailjs/browser';

function ContactForm() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_pike7oe', 'template_x6bqwd3', form.current, {
        publicKey: 'VJ0O_zbip8kNiBNtd',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          alert('Message sent successfully!');
          form.current.reset(); 
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert('Failed to send message. Please try again.');
        }
      );
  };

  return (
    <>
      <h2 className="pb-2 mt-5 border-bottom"></h2>
      <Form
        className="mx-auto shadow-lg mt-5 mb-4"
        id="contact"
        style={{ maxWidth: '400px', padding: '2rem' }}
        ref={form}
        onSubmit={sendEmail}
      >
        <h1 className="h3 mb-3 mt-3 fw-bold text-center pb-2">Contact Us</h1>

        <FloatingLabel controlId="floatingName" label="Full Name" className="mb-3">
          <Form.Control type="text" placeholder="John Doe" required name="username" />
        </FloatingLabel>

        <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
          <Form.Control type="email" placeholder="name@example.com" required name="email" />
        </FloatingLabel>

        <FloatingLabel controlId="floatingMessage" label="Message" className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Your message..."
            style={{ height: '150px' }}
            required
            name="message"
          />
        </FloatingLabel>

        <Button variant="primary" className="w-100 py-2" type="submit" value="Send">
          Send Message
        </Button>
      </Form>
    </>
  );
}

export default ContactForm;
