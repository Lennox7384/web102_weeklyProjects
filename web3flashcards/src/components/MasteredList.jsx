import React from 'react';

const MasteredList = ({ masteredCards }) => {
  return (
    <div className="mastered-list">
      <h2>Mastered Cards ({masteredCards.length})</h2>
      {masteredCards.length > 0 ? (
        <ul>
          {masteredCards.map((card, index) => (
            <li key={index}>{card.question}</li>
          ))}
        </ul>
      ) : (
        <p>No cards mastered yet.</p>
      )}
    </div>
  );
};

export default MasteredList;