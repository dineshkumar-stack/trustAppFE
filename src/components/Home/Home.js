import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={12} className="home-header">
              <h1 style={{ paddingBottom: 15, textAlign: "center" }} className="heading">
                WelCome{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  🙏
                </span>
              </h1>

              <h1 className="heading-name" style={{ paddingBottom: 15, textAlign: "center" }}>
                <strong className="main-name"> AGNI SIRAGUGAL TRUST</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "center" }}>
                <Type />
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
