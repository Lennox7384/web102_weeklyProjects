import React, { useState } from 'react';
import './App.css';
import Flashcard from './components/Flashcard';

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
  const flashcards = [
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

  // State for current card index and flip status
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Function to get a random card
  const handleNextCard = () => {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    setCurrentCardIndex(randomIndex);
    setIsFlipped(false); // Reset flip state for new card
  };

  // Function to flip the card
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="app">
      {/* Header Section */}
      <div className="header">
        <h1>Web3 Flashcards</h1>
        <p>Learn the basics of Web3 and blockchain technology!</p>
        <p>Total Cards: {flashcards.length}</p>
      </div>

      {/* Card Display Section */}
      <div className="card-container">
        <Flashcard
          question={flashcards[currentCardIndex].question}
          answer={flashcards[currentCardIndex].answer}
          image={flashcards[currentCardIndex].image}
          category={flashcards[currentCardIndex].category}
          isFlipped={isFlipped}
          onClick={handleCardClick}
        />
      </div>

      {/* Controls Section */}
      <div className="controls">
        <button onClick={handleNextCard}>Next Card</button>
      </div>
    </div>
  );
};

export default App;
