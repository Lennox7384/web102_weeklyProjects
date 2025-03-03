import React from 'react';

const Card = ({ title, description, date, link }) => {
  return (
    <td className="card">
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        {date && <p className="date">Date: {date}</p>}
        <a href={link} target="_blank" rel="noopener noreferrer">
          Learn More
        </a>
      </div>
    </td>
  );
};

export default Card;