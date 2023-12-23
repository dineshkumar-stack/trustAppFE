import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone <span className="purple"> AGNI SIRAGUGAL TRUST</span>
               from <span className="purple"> India.</span>
            <br />
            We help People for their illness,Education,Sports!
            <br />
            We have completed 3 years and on the go to help many kids and families!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Sports
            </li>
            <li className="about-activity">
              <ImPointRight /> Education
            </li>
            <li className="about-activity">
              <ImPointRight /> Health
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "We makes life better!!!"{" "}
          </p>
          <footer className="blockquote-footer">AGNI SIRAGUGAL TRUST</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
