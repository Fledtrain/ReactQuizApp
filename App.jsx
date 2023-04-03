import "./App.css";
import { questions } from "./data";
import { useState } from "react";

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionClick = (option) => {
    if (selectedOption) return;
    if (option.id === currentQuestion.answerId) {
      setScore(score + 1);
    }
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    if (!selectedOption) return;
    if (currentQuestion.id === questions[questions.length - 1].id) {
      setFinished(true);
    } else {
      const indexOfCurrentQuestion = questions.findIndex((question) => {
        return question.id === currentQuestion.id;
      });

      setCurrentQuestion(questions[indexOfCurrentQuestion + 1]);
      setSelectedOption(null);
    }
  };

  const handleRetryClick = () => {
    setSelectedOption(null);
    setCurrentQuestion(questions[0]);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="App">
      <div className="quiz">
        {finished ? (
          <div className="end-screen">
            <p className="finished">Finished!</p>
            <p>You scored a {100 * (score / questions.length)}%</p>
            <button className="retry-btn" onClick={handleRetryClick}>
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="info">
              <p className="question-counter">
                Question {currentQuestion.id}
                <span className="total">/{questions.length}</span>
              </p>
              <p className="question">{currentQuestion.question}</p>
            </div>
            <div className="options">
              {currentQuestion.options.map((option, i) => (
                <button
                  onClick={() => handleOptionClick(option)}
                  disabled={selectedOption !== null}
                  className={`option ${
                    option.id === selectedOption?.id
                      ? selectedOption?.id === currentQuestion.answerId
                        ? "correct"
                        : "incorrect"
                      : ""
                  }`}
                  key={i}
                >
                  {option.text}
                </button>
              ))}
              <button
                className="next"
                disabled={!selectedOption}
                onClick={handleNextClick}
              >
                {currentQuestion.id === questions[questions.length - 1].id
                  ? "Finish"
                  : "Next"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
