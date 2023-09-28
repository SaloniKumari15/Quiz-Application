import styled from "styled-components";
import React, { useState } from "react";
import StartPage from "./components/StartPage";
import QuizPage from "./components/QuizPage";
import ReportPage from "./components/ReportPage";

const AppContainer = styled.div`
  min-height: 98.5vh;
  border: 8px solid gray;
  margin: 5px;
  padding: 5px;
`;

function App() {
  const [page, setPage] = useState("start");
  const [answers, setAnswers] = useState([]);
  const [email, setEmail] = useState("");
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const totalGivenTime = 30 * 60;

  const startQuiz = (userEmail) => {
    setEmail(userEmail);
    setPage("quiz");
  };

  const endQuiz = (userAnswers, timeSpent) => {
    setAnswers(userAnswers);
    setTotalTimeSpent(timeSpent);
    setPage("report");
  };

  return (
    <AppContainer>
      {page === "start" && <StartPage startQuiz={startQuiz} />}
      {page === "quiz" && <QuizPage endQuiz={endQuiz} email={email} totalGivenTime={totalGivenTime} />}
      {page === "report" && <ReportPage answers={answers} totalTimeSpent={totalTimeSpent} totalGivenTime={totalGivenTime} />}
    </AppContainer>
  );
}

export default App;
