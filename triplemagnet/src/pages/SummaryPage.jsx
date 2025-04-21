import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getUserStartups } from '../services/startupService';

export default function SummaryPage({ user }) {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(location.state?.successMessage || null);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUserStartups(user.id);
        setStartups(data);
      } catch (err) {
        console.error('Error fetching user startups:', err);
        setError('Failed to load your startups. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchStartups();

    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  if (loading) return <div className="container mx-auto p-4 text-center text-text">Loading...</div>;
  if (error) return <div className="container mx-auto p-4 text-center text-red-700">{error}</div>;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-text">My Startups</h1>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          {successMessage}
        </div>
      )}

      <div className="mb-6 p-4 bg-blue-50 rounded-lg shadow-sm">
        <p className="font-semibold text-text">Total Startups Created: {startups.length}</p>
        <p className="text-gray-600">Industry Trend: Tech startups are booming!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.map((startup) => (
          <div
            key={startup.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-text mb-2">{startup.name}</h3>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Category:</strong> {startup.category || 'N/A'}
            </p>
            <p className="text-gray-700 mb-4 line-clamp-3">{startup.description || 'No description available.'}</p>
            <div className="flex space-x-3">
              <Link
                to={`/edit-startup/${startup.id}`}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-all duration-300 ease-in-out font-medium border border-transparent hover:border-yellow-700 shadow-sm hover:shadow-md hover:scale-105 cursor-pointer"
                style={{ backgroundColor: '#D97706' }} // Fallback for yellow-500
              >
                Edit
              </Link>
              <Link
                to={`/startups/${startup.id}`}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out font-medium border border-transparent hover:border-blue-700 shadow-sm hover:shadow-md hover:scale-105 cursor-pointer"
                style={{ backgroundColor: '#1D4ED8' }} // Fallback for primary
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}