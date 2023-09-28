import styled from "styled-components";
import React from "react";

const ReportPageContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const Status = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  color: ${(props) => (props.isPassed ? "#28a745" : "#dc3545")};
  background-color: ${(props) => (props.isPassed ? "#d4edda" : "#f8d7da")};
`;

const Score = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;

const Time = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

function ReportPage({ answers, totalTimeSpent, totalGivenTime }) {
  const totalQuestions = answers.length;
  const correctAnswers = answers.filter((answer) => answer.userAnswer === answer.correctAnswer).length;
  const scorePercentage = (correctAnswers / totalQuestions) * 100;
  const isPassed = scorePercentage >= 60;

  return (
    <ReportPageContainer>
      <h1>Report Page</h1>
      <Status isPassed={isPassed}>{isPassed ? "Passed" : "Failed"}</Status>
      <Score>
        Score: {correctAnswers} / {totalQuestions} ({scorePercentage.toFixed(2)}%)
      </Score>
      <Time>
        Time Spent: {(totalTimeSpent / 60).toFixed(1)} / {totalGivenTime / 60} minutes
      </Time>
      <ul>
        {answers.map((answer, index) => (
          <ListItem key={index}>
            <div dangerouslySetInnerHTML={{ __html: "Question: " + answer.question }} />
            <div>Your Answer: {answer.userAnswer}</div>
            <div>Correct Answer: {answer.correctAnswer}</div>
          </ListItem>
        ))}
      </ul>
    </ReportPageContainer>
  );
}

export default ReportPage;
