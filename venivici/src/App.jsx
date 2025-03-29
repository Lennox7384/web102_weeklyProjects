import { useState } from 'react';
import './App.css';

function App() {
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [history, setHistory] = useState([]);
  const [banList, setBanList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const UNSPLASH_ACCESS_KEY = 'TwQ1URjrqnP9yWJMLn4ES0ysbNGvy4mIBUyuGM6eR_I';

  const fetchRandomPhoto = async () => {
    setIsLoading(true);
    setError(null);
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?query=travel&client_id=${UNSPLASH_ACCESS_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch photo. You may have hit the rate limit.');
        }
        const data = await response.json();

        const tags = data.tags?.map((tag) => tag.title) || [];
        const hasBannedTag = tags.some((tag) => banList.includes(tag));

        if (!hasBannedTag && data.urls?.regular && data.alt_description) {
          const newPhoto = {
            image: data.urls.regular,
            description: data.alt_description,
            location: data.location?.name || 'Unknown Location',
            photographer: data.user?.name || 'Unknown Photographer',
            tags: tags,
          };
          setCurrentPhoto(newPhoto);
          setHistory((prevHistory) => [newPhoto, ...prevHistory].slice(0, 5));
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.error('Error fetching photo:', error);
        setError(error.message);
      }
      attempts++;
    }

    setError('Could not find a suitable photo with the current ban list.');
    setIsLoading(false);
  };

  const toggleBan = (tag) => {
    if (banList.includes(tag)) {
      setBanList(banList.filter((item) => item !== tag));
    } else {
      setBanList([...banList, tag]);
      if (currentPhoto && currentPhoto.tags.includes(tag)) {
        setCurrentPhoto(null);
      }
    }
  };

  return (
    <div className="app-container">
      {/* Left Column: History */}
      <div className="history-column">
        <h2>Who have we seen so far?</h2>
        {history.length > 0 ? (
          history.map((photo, index) => (
            <div key={index} className="history-item">
              <img src={photo.image} alt={photo.description} />
              <p>
                A travel photo from {photo.location}
              </p>
            </div>
          ))
        ) : (
          <p>No photos seen yet.</p>
        )}
      </div>

      {/* Center Column: Main Content */}
      <div className="main-column">
        <h1>Veni Vici!</h1>
        <p>Discover travel photos from your wildest dreams! 🌍✨📸</p>
        {error ? (
          <p className="error">Error: {error}</p>
        ) : isLoading ? (
          <p>Loading...</p>
        ) : currentPhoto ? (
          <div className="photo-display">
            <div className="tags">
              {currentPhoto.tags.map((tag) => (
                <span
                  key={tag}
                  className="attribute-box tag"
                  onClick={() => toggleBan(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
            <img src={currentPhoto.image} alt={currentPhoto.description} />
            <div className="attributes">
              <span className="attribute-label">Location: {currentPhoto.location}</span>
              <span className="attribute-label">Description: {currentPhoto.description}</span>
              <span className="attribute-label">Photographer: {currentPhoto.photographer}</span>
            </div>
          </div>
        ) : (
          <p>Click the button to discover a travel photo!</p>
        )}
        <button className="discover-button" onClick={fetchRandomPhoto}>
          Discover!
        </button>
      </div>

      {/* Right Column: Ban List */}
      <div className="ban-list-column">
        <h2>Ban List</h2>
        <p>Select a tag to ban it</p>
        {banList.length > 0 ? (
          banList.map((tag) => (
            <span
              key={tag}
              className="ban-item"
              onClick={() => toggleBan(tag)}
            >
              {tag}
            </span>
          ))
        ) : (
          <p>No tags banned yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;