import styled from "styled-components";
import React, { useState } from "react";
import BackGroud from "../assets/backgroud.jpg";
import quizBg from "../assets/quiz-bg.jpg";

const StartPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  min-height: 98.5vh;
  background: url(${BackGroud});
  background-size: cover;

  @media (max-width: 800px) {
    padding: 20px 0;
  }
`;

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 8vw;
  font-family: "Courier New", Courier, monospace;
  cursor: pointer;
  color: darkslategray;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;

  @media (max-width: 800px) {
    font-size: 12vw;
  }
`;

const Banner = styled.div`
  width: 55%;
  min-height: 35vh;
  align-items: center;
  padding: 8px;
  background: url(${quizBg});
  background-size: cover;

  @media (max-width: 800px) {
    width: 85%;
    padding: 0;
    padding-top: 20px;
  }
`;

const EmailInput = styled.input`
  display: flex;
  margin: 30px;
  padding: 10px;
  width: 100%;
  max-width: 350px;
`;

const StartButton = styled.button`
  padding: 10px;
  cursor: pointer;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

function StartPage({ startQuiz }) {
  const [email, setEmail] = useState("");

  const handleStartQuiz = () => {
    if (email) startQuiz(email);
    else alert("Please enter a valid email address");
  };

  return (
    <StartPageContainer>
      <Title>Let’s Get Quizzical</Title>
      {/* <Divider /> */}
      <Banner />
      <EmailInput type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <StartButton onClick={handleStartQuiz}>Start Quiz</StartButton>
    </StartPageContainer>
  );
}

export default StartPage;
