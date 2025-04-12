// src/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend, Label } from 'recharts';
import './App.css';

function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceChangeFilter, setPriceChangeFilter] = useState('All Price Changes');
  const [volumeFilter, setVolumeFilter] = useState(0);
  const [showCharts, setShowCharts] = useState(true); // State for toggling charts

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

  // Prepare data for Bar Chart (Top 5 Coins by 24h Trading Volume)
  const topVolumeData = coins
    .sort((a, b) => b.total_volume - a.total_volume)
    .slice(0, 5)
    .map(coin => ({
      name: coin.name,
      volume: coin.total_volume,
    }));

  // Prepare data for Pie Chart (Distribution of 24h Price Changes)
  const priceChangeDistribution = [
    {
      name: 'Positive Change',
      value: coins.filter(coin => coin.price_change_percentage_24h > 0).length,
    },
    {
      name: 'Negative Change',
      value: coins.filter(coin => coin.price_change_percentage_24h < 0).length,
    },
    {
      name: 'No Change',
      value: coins.filter(coin => coin.price_change_percentage_24h === 0 || !coin.price_change_percentage_24h).length,
    },
  ];

  // Find the dominant price change trend for annotation
  const dominantTrend = priceChangeDistribution.reduce((max, entry) => 
    entry.value > max.value ? entry : max, priceChangeDistribution[0]);

  const COLORS = ['#00e676', '#ff1744', '#b0bec5'];

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

        <motion.div
          className="data-insights"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <h3>Explore Market Trends</h3>
          <p>
            This dashboard provides a snapshot of the top 50 cryptocurrencies by market cap, sourced from CoinGecko. The charts below highlight key trends: the bar chart shows the most actively traded coins by 24-hour volume, indicating market liquidity, while the pie chart reveals the overall market sentiment through the distribution of price changes. Use the filters to dive deeper—try setting the price change filter to "Positive Change" to identify coins gaining value, or adjust the volume filter to focus on high-activity coins.
          </p>
        </motion.div>

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

        {/* Toggle Button for Charts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <button
            className="toggle-charts-btn"
            onClick={() => setShowCharts(!showCharts)}
          >
            {showCharts ? 'Hide Charts' : 'Show Charts'}
          </button>
        </motion.div>

        {/* Charts Section with Toggle */}
        <AnimatePresence>
          {showCharts && (
            <motion.div
              className="charts-section"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="chart-container">
                <h3>Top 5 Coins by 24h Trading Volume</h3>
                <BarChart width={600} height={300} data={topVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#40c4ff" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#e0e0e0" />
                  <YAxis stroke="#e0e0e0" tickFormatter={(value) => `$${value.toLocaleString()}`} />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Bar dataKey="volume" fill="#40c4ff">
                    {topVolumeData.map((entry, index) => (
                      <Label
                        key={index}
                        value={index === 0 ? 'Highest Volume' : ''}
                        position="top"
                        fill="#e91e63"
                        fontSize={12}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </div>
              <div className="chart-container">
                <h3>24h Price Change Distribution</h3>
                <PieChart width={400} height={300}>
                  <Pie
                    data={priceChangeDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {priceChangeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                  <Label
                    value={`Dominant: ${dominantTrend.name}`}
                    position="center"
                    fill="#e0e0e0"
                    fontSize={14}
                  />
                </PieChart>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <Sidebar
            onSearchChange={setSearchQuery}
            onPriceChangeFilter={setPriceChangeFilter}
            onVolumeFilter={setVolumeFilter}
            priceChangeFilter={priceChangeFilter}
          />
        </motion.div>

        <div className="coin-list">
          {filteredCoins.length > 0 ? (
            filteredCoins.slice(0, 10).map((coin, index) => (
              <Link to={`/coin/${coin.id}`} key={coin.id} style={{ textDecoration: 'none' }}>
                <motion.div
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
              </Link>
            ))
          ) : (
            <p>No coins match your search or filter criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;