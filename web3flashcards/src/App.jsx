import React, { useState } from 'react';
import './App.css';
import Flashcard from './components/Flashcard';
import InputForm from './components/InputForm';
import MasteredList from './components/MasteredList';

// Import local images
import blockchain from './images/blockchain.jpeg';
import crypto from './images/crypto.webp';
import cryptowallet from './images/cryptowallet.png';
import dapps from './images/dapps.jpg';
import decentralization from './images/decentralization.webp';
import ethereum from './images/ethereum.jpg';
import metamask from './images/metamask.jpg';
import nft from './images/nft.jpeg';
import smartcontracts from './images/smartcontracts.jpg';
import web3 from './images/web3.jpg';

const App = () => {
  // Flashcard data: 10 basic Web3 question-answer pairs with images and categories
  const initialFlashcards = [ // Fixed typo: initialFlashcards (not initialflashcards)
    { question: "What is Web3?", answer: "Web3 is the next generation of the internet, powered by decentralized technologies like blockchain.", image: web3, category: "Basics" },
    { question: "What is a Blockchain?", answer: "A blockchain is a decentralized, secure ledger of transactions.", image: blockchain, category: "Basics" },
    { question: "What is a Cryptocurrency?", answer: "A digital currency secured by cryptography, like Bitcoin or Ethereum.", image: crypto, category: "Finance" },
    { question: "What is Ethereum?", answer: "Ethereum is a blockchain platform that supports smart contracts.", image: ethereum, category: "Platforms" },
    { question: "What are Smart Contracts?", answer: "Self-executing contracts with code running on a blockchain.", image: smartcontracts, category: "Tech" },
    { question: "What is a Wallet?", answer: "A software or physical device to store private and public keys for crypto transactions.", image: cryptowallet, category: "Finance" },
    { question: "What is Decentralization?", answer: "Distributing control away from a central authority, a core Web3 principle.", image: decentralization, category: "Basics" },
    { question: "What is a DApp?", answer: "A decentralized application running on a blockchain.", image: dapps, category: "Tech" },
    { question: "What is Metamask?", answer: "A popular browser extension wallet for Ethereum transactions.", image: metamask, category: "Tools" },
    { question: "What is an NFT?", answer: "A Non-Fungible Token, a unique digital asset on a blockchain.", image: nft, category: "Finance" },
  ];

  // State variables
  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState(null); // null, 'correct', 'incorrect'
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [masteredCards, setMasteredCards] = useState([]);
  const [history, setHistory] = useState([]); // For back navigation

  // Fuzzy matching function
  const isAnswerCorrect = (input, answer) => {
    const cleanInput = input.trim().toLowerCase();
    const cleanAnswer = answer.toLowerCase();
    return cleanInput === cleanAnswer || cleanAnswer.includes(cleanInput);
  };

  // Event handlers
  const handleSubmit = () => {
    if (!isFlipped) {
      const correct = isAnswerCorrect(userInput, flashcards[currentIndex].answer);
      setFeedback(correct ? 'correct' : 'incorrect');
      setIsFlipped(true);
      if (correct) {
        setCurrentStreak(currentStreak + 1);
        setLongestStreak(Math.max(longestStreak, currentStreak + 1));
      } else {
        setCurrentStreak(0);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setHistory([...history, currentIndex]);
      setCurrentIndex(currentIndex + 1);
    }
    resetCardState();
  };

  const handleBack = () => {
    if (history.length > 0) {
      setCurrentIndex(history[history.length - 1]);
      setHistory(history.slice(0, -1));
    }
    resetCardState();
  };

  const handleShuffle = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentIndex(0);
    setHistory([]);
    resetCardState();
  };

  const handleMastered = () => {
    const masteredCard = flashcards[currentIndex];
    setMasteredCards([...masteredCards, masteredCard]);
    setFlashcards(flashcards.filter((_, i) => i !== currentIndex));
    setCurrentIndex(Math.min(currentIndex, flashcards.length - 2)); // Adjust index
    setHistory([]);
    resetCardState();
  };

  const resetCardState = () => {
    setIsFlipped(false);
    setUserInput('');
    setFeedback(null);
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Web3 Flashcards</h1>
        <p>Learn the basics of Web3 and blockchain technology!</p>
        <p>Total Cards: {flashcards.length} | Streaks: Current {currentStreak} / Longest {longestStreak}</p>
      </div>

      <div className="card-container">
        {flashcards.length > 0 ? (
          <Flashcard
            question={flashcards[currentIndex].question}
            answer={flashcards[currentIndex].answer}
            image={flashcards[currentIndex].image}
            category={flashcards[currentIndex].category}
            isFlipped={isFlipped}
            onClick={() => setIsFlipped(!isFlipped)}
            feedback={feedback}
          />
        ) : (
          <p>No cards left to study!</p>
        )}
      </div>

      <div className="controls">
        <InputForm
          userInput={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onSubmit={handleSubmit}
          disabled={isFlipped}
        />
        <button onClick={handleBack} disabled={history.length === 0}>Back</button>
        <button onClick={handleNext} disabled={currentIndex === flashcards.length - 1}>Next</button>
        <button onClick={handleShuffle}>Shuffle</button>
        <button onClick={handleMastered} disabled={flashcards.length === 0}>Mark Mastered</button>
      </div>

      <div className="mastered-section">
        <MasteredList masteredCards={masteredCards} />
      </div>
    </div>
  );
};

export default App;