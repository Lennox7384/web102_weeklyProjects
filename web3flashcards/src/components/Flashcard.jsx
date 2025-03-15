import React from 'react';

const Flashcard = ({ question, answer, image, category, isFlipped, onClick, feedback }) => {
  const getCardClass = () => {
    let baseClass = "flashcard";
    switch (category) {
      case "Basics": baseClass += " basics"; break;
      case "Finance": baseClass += " finance"; break;
      case "Tech": baseClass += " tech"; break;
      case "Platforms": baseClass += " platforms"; break;
      case "Tools": baseClass += " tools"; break;
    }
    if (feedback === 'correct') baseClass += " correct";
    if (feedback === 'incorrect') baseClass += " incorrect";
    return baseClass;
  };

  return (
    <div className={`${getCardClass()} ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front">
          <img src={image} alt={question} />
          <div className="card-content">{question}</div>
        </div>
        <div className="card-back">
          <img src={image} alt={answer} />
          <div className="card-content">{answer}</div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;