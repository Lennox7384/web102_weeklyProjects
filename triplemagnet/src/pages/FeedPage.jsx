import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllStartups } from '../services/startupService';

export default function FeedPage() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllStartups();
        setStartups(data);
      } catch (err) {
        console.error('Error fetching startups:', err);
        setError('Failed to load startups. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchStartups();
  }, []);

  if (loading) return <div className="container mx-auto p-4 text-center text-text">Loading...</div>;
  if (error) return <div className="container mx-auto p-4 text-center text-red-700">{error}</div>;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-text">Startup Feed</h1>
      {startups.length === 0 ? (
        <p className="text-text">No startups found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {startups.map((startup) => (
            <div
              key={startup.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-text mb-2">{startup.name}</h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Location:</strong> {startup.location || 'N/A'}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Category:</strong> {startup.category || 'N/A'}
              </p>
              <p className="text-gray-700 mb-4 line-clamp-3">{startup.description || 'No description available.'}</p>
              <Link
                to={`/startups/${startup.id}`}
                className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out font-medium border border-transparent hover:border-blue-700 shadow-sm hover:shadow-md hover:scale-105 cursor-pointer"
                style={{ backgroundColor: '#1D4ED8' }} // Fallback background color
              >
                View Details & Apply
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}