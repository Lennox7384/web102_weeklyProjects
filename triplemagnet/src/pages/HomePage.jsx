import { Link } from 'react-router-dom';
import { getUserStartups } from '../services/startupService';
import { useState, useEffect } from 'react';

export default function HomePage({ user }) {
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const data = await getUserStartups(user.id);
        setStartups(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStartups();
  }, [user]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.email}!</h1>
      <div className="mb-4">
        <Link to="/create-startup" className="bg-blue-600 text-white p-2 rounded">Create a New Startup</Link>
      </div>
      <h2 className="text-xl font-semibold mb-2">Your Startups</h2>
      {startups.length === 0 ? (
        <p>You haven't created any startups yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {startups.map((startup) => (
            <div key={startup.id} className="border p-4 rounded shadow">
              <h3 className="font-bold">{startup.name}</h3>
              <p>{startup.description}</p>
              <Link to={`/startups/${startup.id}`} className="text-blue-600 hover:underline">View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}