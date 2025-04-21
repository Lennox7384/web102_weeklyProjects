import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStartup } from '../services/startupService';

export default function CreateStartupPage() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    category: '',
    industry: '',
    team_size: 1,
    looking_for: '',
    funding_status: '',
    vision: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log('Submitting startup data:', formData);
      await createStartup(formData);
      navigate('/my-startups', { state: { successMessage: 'Startup created successfully!' } });
    } catch (err) {
      console.error('Error creating startup:', err);
      setError(err.message || 'Failed to create startup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-text">Create a New Startup</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-text font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-text font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-text font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text h-32 resize-y"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-text font-medium mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
            disabled={loading}
          >
            <option value="">Select a category</option>
            <option value="Tech">Tech</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
        <div>
          <label className="block text-text font-medium mb-2">Industry</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-text font-medium mb-2">Team Size</label>
          <input
            type="number"
            name="team_size"
            value={formData.team_size}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
            min="1"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-text font-medium mb-2">Looking For</label>
          <select
            name="looking_for"
            value={formData.looking_for}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
            disabled={loading}
          >
            <option value="">Select a role</option>
            <option value="Co-founder">Co-founder</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Advisor">Advisor</option>
          </select>
        </div>
        <div>
          <label className="block text-text font-medium mb-2">Funding Status</label>
          <input
            type="text"
            name="funding_status"
            value={formData.funding_status}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-text font-medium mb-2">Vision</label>
          <textarea
            name="vision"
            value={formData.vision}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text h-32 resize-y"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white p-3 rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out font-medium border border-transparent hover:border-blue-700 shadow-sm hover:shadow-md hover:scale-105 cursor-pointer disabled:bg-gray-400 disabled:shadow-none disabled:scale-100 disabled:cursor-not-allowed"
          disabled={loading}
          style={{ backgroundColor: '#1D4ED8' }} // Fallback background color
        >
          {loading ? 'Creating...' : 'Create Startup'}
        </button>
      </form>
    </div>
  );
}