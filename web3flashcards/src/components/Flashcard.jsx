import React from 'react';

const Flashcard = ({ question, answer, image, category, isFlipped, onClick }) => {
  const getCardClass = () => {
    switch (category) {
      case "Basics": return "flashcard basics";
      case "Finance": return "flashcard finance";
      case "Tech": return "flashcard tech";
      case "Platforms": return "flashcard platforms";
      case "Tools": return "flashcard tools";
      default: return "flashcard";
    }
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