import React from 'react';
import './App.css';
import Card from './components/Card';

const App = () => {
  const spaceResources = [
    {
      title: "NASA Live Stream",
      description: "Watch live footage from the International Space Station",
      link: "https://www.nasa.gov/nasalive",
    },
    {
      title: "Stellarium Web",
      description: "Interactive online planetarium to explore the night sky",
      link: "https://stellarium-web.org/",
    },
    {
      title: "SpaceX Launch Schedule",
      description: "Upcoming rocket launches and missions",
      date: "Ongoing",
      link: "https://www.spacex.com/launches/",
    },
    {
      title: "Astronomy Picture of the Day",
      description: "Daily images from space with expert explanations",
      link: "https://apod.nasa.gov/",
    },
    {
      title: "Virtual Telescope Project",
      description: "Live online telescope viewing sessions",
      date: "Weekly",
      link: "https://www.virtualtelescope.eu/",
    },
    {
      title: "Cosmos Learning Hub",
      description: "Free online courses about space science",
      link: "https://www.cosmos.esa.int/",
    },
    {
      title: "SETI@home",
      description: "Contribute computing power to search for extraterrestrial intelligence",
      link: "https://setiathome.berkeley.edu/",
    },
    {
      title: "Mars Rover Photos",
      description: "Latest images from Mars exploration rovers",
      link: "https://mars.nasa.gov/",
    },
    {
      title: "International Astronomy Meetup",
      description: "Global virtual stargazing event",
      date: "March 15-16, 2025",
      link: "https://www.iau.org/",
    },
    {
      title: "Space Weather Forecast",
      description: "Real-time updates on solar activity and aurora predictions",
      link: "https://www.spaceweather.com/",
    },
  ];

  return (
    <div className="App">
      <h1>Space Exploration Community Board</h1>
      <p>Welcome to your hub for space-related events and resources!</p>
      
      <table className="cards-container">
        <tbody>
          {/* Split into rows of 3 cards each */}
          {Array(Math.ceil(spaceResources.length / 3))
            .fill()
            .map((_, rowIndex) => (
              <tr key={rowIndex}>
                {spaceResources
                  .slice(rowIndex * 3, rowIndex * 3 + 3)
                  .map((resource, index) => (
                    <Card
                      key={index}
                      title={resource.title}
                      description={resource.description}
                      date={resource.date}
                      link={resource.link}
                    />
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;