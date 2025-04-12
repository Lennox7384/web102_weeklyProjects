import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import './App.css';

function CoinDetail() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch coin data from CoinGecko API');
        }
        const data = await response.json();
        setCoin(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching coin data:', error);
        setError(error.message);
      }
    };
    fetchCoin();
  }, [id]);

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const particlesOptions = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: ['#40c4ff', '#e91e63'],
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: 0.5,
        random: true,
      },
      size: {
        value: 3,
        random: true,
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: true,
        out_mode: 'out',
      },
      links: {
        enable: true,
        distance: 150,
        color: '#40c4ff',
        opacity: 0.3,
        width: 1,
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: 'repulse',
        },
      },
    },
  };

  if (error) {
    return (
      <div className="App">
        <div className="dashboard-container">
          <p className="error">Error: {error}</p>
          <Link to="/" className="back-link">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="App">
        <div className="dashboard-container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="particles"
      />
      <div className="dashboard-container">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {coin.name} Details
        </motion.h1>
        <Link to="/" className="back-link">Back to Dashboard</Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <Sidebar
            onSearchChange={() => {}} // Empty handler to disable in detail view
            onPriceChangeFilter={() => {}} // Empty handler
            onVolumeFilter={() => {}} // Empty handler
            priceChangeFilter="All Price Changes" // Static value
          />
        </motion.div>

        <motion.div
          className="coin-detail"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="coin-detail-header">
            <img src={coin.image.large} alt={coin.name} width="50" />
            <h2>{coin.name} ({coin.symbol.toUpperCase()})</h2>
          </div>
          <div className="coin-detail-info">
            <p><strong>Current Price:</strong> ${coin.market_data.current_price.usd.toLocaleString()}</p>
            <p><strong>Market Cap:</strong> ${coin.market_data.market_cap.usd.toLocaleString()}</p>
            <p><strong>Market Cap Rank:</strong> #{coin.market_cap_rank}</p>
            <p><strong>All-Time High:</strong> ${coin.market_data.ath.usd.toLocaleString()} (on {new Date(coin.market_data.ath_date.usd).toLocaleDateString()})</p>
            <p><strong>Circulating Supply:</strong> {coin.market_data.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}</p>
            <p><strong>Total Supply:</strong> {coin.market_data.total_supply ? coin.market_data.total_supply.toLocaleString() : 'N/A'} {coin.symbol.toUpperCase()}</p>
            <p><strong>24h High:</strong> ${coin.market_data.high_24h.usd.toLocaleString()}</p>
            <p><strong>24h Low:</strong> ${coin.market_data.low_24h.usd.toLocaleString()}</p>
            <p><strong>24h Price Change:</strong> 
              <span className={coin.market_data.price_change_percentage_24h >= 0 ? 'price-up' : 'price-down'}>
                {coin.market_data.price_change_percentage_24h?.toFixed(2) || 'N/A'}%
              </span>
            </p>
            <p><strong>24h Volume:</strong> ${coin.market_data.total_volume.usd.toLocaleString()}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CoinDetail;