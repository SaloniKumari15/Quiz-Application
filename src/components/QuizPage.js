import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";

const QuizPageContainer = styled.div`
  display: block;
  padding: 20px;
  margin: 40px;
  min-height: 98.5vh;
  background-color: #edf0f3;
`;

const Subtitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  margin: 20px;
  border: 1px solid black;
  box-shadow: 4px 4px 2px black;
  padding: 5px 10px;
`;

const Timer = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

const QuestionAnswer = styled.div`
  padding: 10px;
`;

const Choices = styled.div`
  width: 95%;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const ChoiceLabel = styled.label`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: background 0.3s;

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #218838;
  }
`;

function QuizPage({ endQuiz, email, totalGivenTime }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(30 * 60);
  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=15")
      .then((response) => setQuestions(response.data.results))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleSubmit = () => {
    const userAnswers = questions.map((question, index) => ({
      question: question.question,
      userAnswer: answers[index] || "Not Answered",
      correctAnswer: question.correct_answer,
    }));
    const totalTimeSpent = totalGivenTime - timer; // Calculate the total time spent
    endQuiz(userAnswers, totalTimeSpent); 
  };

  const handleAnswer = (answer) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestion] = answer;
      return newAnswers;
    });
  };

  const handleNavigation = (index) => {
    setCurrentQuestion(index);
  };

  return (
    <QuizPageContainer>
      <Subtitle>
        <h1>Welcome {email}</h1>
      </Subtitle>
      <Timer>
        Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
        {timer % 60}
      </Timer>
      {questions.length > 0 && (
        <div>
          <h2 className="number"> Question {currentQuestion + 1}</h2>
          <QuestionAnswer>
            <div dangerouslySetInnerHTML={{ __html: questions[currentQuestion].question }} />
            <Choices>
              {[...questions[currentQuestion].incorrect_answers, questions[currentQuestion].correct_answer].map((choice, index) => (
                <ChoiceLabel key={index}>
                  <input type="radio" name="answer" value={choice} onChange={() => handleAnswer(choice)} checked={answers[currentQuestion] === choice} />
                  <span dangerouslySetInnerHTML={{ __html: choice }} />
                </ChoiceLabel>
              ))}
            </Choices>
          </QuestionAnswer>
          <NavigationButtons>
            <Button disabled={currentQuestion === 0} onClick={() => handleNavigation(currentQuestion - 1)}>
              Previous
            </Button>
            <Button disabled={currentQuestion === questions.length - 1} onClick={() => handleNavigation(currentQuestion + 1)}>
              Next
            </Button>
          </NavigationButtons>
        </div>
      )}
      <Button onClick={handleSubmit}>Submit</Button>
    </QuizPageContainer>
  );
}

export default QuizPage;
