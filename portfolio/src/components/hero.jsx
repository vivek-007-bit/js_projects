import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Image } from "react-bootstrap";
import Typed from "typed.js";

function HeroSection() {
  const navigate = useNavigate();

  const typedRef = useRef(null);
  const vantaRef = useRef(null);

  const handleExplore = () => {
    navigate("/explore");
  };

  const handleContact = () => {
    navigate("/contact");
  };


  useEffect(() => {
    const effect = window.VANTA.NET({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      points: 15.0,
      spacing: 14.0,
    });

    return () => {
      if (effect) effect.destroy();
    };
  }, []);


  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Full Stack Developer",
        "Machine Learning Expert",
        "UI/UX Designer",
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      id="hero"
      style={{
        background: "linear-gradient(135deg, #6c63ff 0%, #ff6584 100%)",
        color: "white",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Container className="text-center">
        <Image
          src="/profile-pic.jpg"
          alt="profile picture"
          width={200}
          height={200}
          roundedCircle
          className="d-block mx-auto mb-4 mt-5 border border-light"
          style={{
            boxShadow: "0px 0px 15px 15px rgba(0, 0, 0, 0.68)",
          }}
        />

        <h1 className="display-4 fw-bold mb-3" style={{
          color: "white",
          fontWeight: "700",
          textShadow:
            "0 0 5px rgba(0, 119, 255, 0.8), 0 0 10px rgba(0, 119, 255, 0.6), 0 0 20px rgba(0, 119, 255, 0.4)",
        }}>
          Hi, I’m Vivek Sharma
        </h1>

        <h3
          className="mb-3"
          style={{
            color: "white",
            fontWeight: "700",
            textShadow:
              "0 0 5px rgba(0, 119, 255, 0.8), 0 0 10px rgba(0, 119, 255, 0.6), 0 0 20px rgba(0, 119, 255, 0.4)",
          }}
        >
          I am a
          <span
            ref={typedRef}
            style={{
              marginLeft: "10px",
            }}
          ></span>
        </h3>

        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center herobtn">
          <Button
            variant="light"
            size="lg"
            className="px-4 me-sm-3 mb-2 mb-sm-0"
            onClick={handleExplore}
          >
            Explore Portfolio
          </Button>

          <Button
            variant="outline-light"
            size="lg"
            className="px-4"
            onClick={handleContact}
          >
            Contact Me
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default HeroSection;