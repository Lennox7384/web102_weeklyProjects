import React, { useState, useEffect } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceChangeFilter, setPriceChangeFilter] = useState('All Price Changes');
  const [volumeFilter, setVolumeFilter] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data from CoinGecko API');
        }
        const data = await response.json();
        setCoins(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };
    fetchCoins();
  }, []);

  const highVolumeCoins = coins.filter(coin => coin.total_volume > 100_000_000).length;
  const avgPriceChange = coins.length
    ? (coins.reduce((sum, coin) => sum + (coin.price_change_percentage_24h || 0), 0) / coins.length).toFixed(2)
    : 0;
  const volumeRange =
    coins.length > 0
      ? `$${Math.min(...coins.map(coin => coin.total_volume)).toLocaleString()} - $${Math.max(
          ...coins.map(coin => coin.total_volume)
        ).toLocaleString()}`
      : 'N/A';

  const filteredCoins = coins
    .filter(coin =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(coin => {
      if (priceChangeFilter === 'Positive Change') return coin.price_change_percentage_24h > 0;
      if (priceChangeFilter === 'Negative Change') return coin.price_change_percentage_24h < 0;
      return true;
    })
    .filter(coin => coin.total_volume >= volumeFilter);

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const handlePriceChangeFilter = value => {
    setPriceChangeFilter(value);
    setIsDropdownOpen(false);
  };

  const handleVolumeFilter = event => {
    setVolumeFilter(Number(event.target.value));
  };

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
          Crypto Market Insights
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Track price trends, trading volumes, and market insights for top cryptocurrencies.
        </motion.p>

        {error && <p className="error">Error: {error}</p>}

        <motion.div
          className="summary-stats"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <div className="stat">
            <h3>High Volume Coins</h3>
            <p>{highVolumeCoins} coins with 24h volume greater than $100M</p>
          </div>
          <div className="stat">
            <h3>Avg 24h Price Change</h3>
            <p>{avgPriceChange}%</p>
          </div>
          <div className="stat">
            <h3>24h Volume Range</h3>
            <p>{volumeRange}</p>
          </div>
        </motion.div>

        <motion.div
          className="controls"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <input
            type="text"
            placeholder="Search by coin name (e.g., Bitcoin)"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <div
            className="custom-filter"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => {
              setTimeout(() => {
                setIsDropdownOpen(false);
              }, 200);
            }}
          >
            <div className="filter-selected">
              {priceChangeFilter}
              <span className="filter-arrow">▼</span>
            </div>
            {isDropdownOpen && (
              <div className="filter-options">
                <div
                  className="filter-option"
                  onClick={() => handlePriceChangeFilter('All Price Changes')}
                >
                  All Price Changes
                </div>
                <div
                  className="filter-option"
                  onClick={() => handlePriceChangeFilter('Positive Change')}
                >
                  Positive Change
                </div>
                <div
                  className="filter-option"
                  onClick={() => handlePriceChangeFilter('Negative Change')}
                >
                  Negative Change
                </div>
              </div>
            )}
          </div>
          <div className="volume-filter">
            <label>Min 24h Volume: ${volumeFilter.toLocaleString()}</label>
            <input
              type="range"
              min="0"
              max="500000000"
              step="1000000"
              value={volumeFilter}
              onChange={handleVolumeFilter}
            />
          </div>
        </motion.div>

        <div className="coin-list">
          {filteredCoins.length > 0 ? (
            filteredCoins.slice(0, 10).map((coin, index) => (
              <motion.div
                key={coin.id}
                className={`coin-row ${coin.total_volume > 100_000_000 ? 'highlight' : ''}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="coin-info">
                  <img src={coin.image} alt={coin.name} width="30" />
                  <span>
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </span>
                </div>
                <div>Price: ${coin.current_price.toLocaleString()}</div>
                <div>24h Volume: ${coin.total_volume.toLocaleString()}</div>
                <motion.div
                  className={
                    coin.price_change_percentage_24h >= 0 ? 'price-up' : 'price-down'
                  }
                  animate={
                    coin.total_volume > 100_000_000
                      ? { boxShadow: ['0 0 10px #40c4ff', '0 0 20px #40c4ff'] }
                      : {}
                  }
                  transition={
                    coin.total_volume > 100_000_000
                      ? { repeat: Infinity, duration: 1.5, ease: 'easeInOut' }
                      : {}
                  }
                >
                  24h Change: {coin.price_change_percentage_24h?.toFixed(2) || 'N/A'}%
                </motion.div>
              </motion.div>
            ))
          ) : (
            <p>No coins match your search or filter criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;