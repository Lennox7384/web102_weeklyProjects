import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStartupById, applyToStartup, getApplicationsForStartup, updateApplicationStatus } from '../services/startupService';
import { supabase } from '../supabaseClient';

export default function StartupDetailPage({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [startup, setStartup] = useState(null);
  const [applicationMessage, setApplicationMessage] = useState('');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStartup = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch startup details
        const startupData = await getStartupById(id);
        console.log('Fetched startup:', startupData);
        setStartup(startupData);

        // Fetch applications if the user is the owner
        if (user && user.id === startupData.user_id) {
          const apps = await getApplicationsForStartup(id);
          console.log('Fetched applications:', apps);
          setApplications(apps);
        }
      } catch (err) {
        console.error('Error fetching startup:', err);
        setError('Failed to load startup details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchStartup();
  }, [id, user]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await applyToStartup(id, applicationMessage);
      alert('Application submitted successfully!');
      setApplicationMessage('');
    } catch (err) {
      console.error('Error applying to startup:', err);
      alert('Failed to submit application. Please try again.');
    }
  };

  const handleApplicationStatus = async (applicationId, status) => {
    try {
      await updateApplicationStatus(applicationId, status);
      setApplications(applications.map(app => app.id === applicationId ? { ...app, status } : app));
    } catch (err) {
      console.error('Error updating application status:', err);
      alert('Failed to update application status. Please try again.');
    }
  };

  if (loading) return <div className="container mx-auto p-4 text-center text-text">Loading...</div>;
  if (error) return <div className="container mx-auto p-4 text-center text-red-700">{error}</div>;
  if (!startup) return <div className="container mx-auto p-4 text-center text-text">Startup not found.</div>;

  const isOwner = user && user.id === startup.user_id;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-text">{startup.name}</h1>

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-6">
        <p className="text-text mb-2"><strong>Location:</strong> {startup.location || 'N/A'}</p>
        <p className="text-text mb-2"><strong>Category:</strong> {startup.category || 'N/A'}</p>
        <p className="text-text mb-2"><strong>Industry:</strong> {startup.industry || 'N/A'}</p>
        <p className="text-text mb-2"><strong>Team Size:</strong> {startup.team_size || 'N/A'}</p>
        <p className="text-text mb-2"><strong>Looking For:</strong> {startup.looking_for || 'N/A'}</p>
        <p className="text-text mb-2"><strong>Funding Status:</strong> {startup.funding_status || 'N/A'}</p>
        <p className="text-text mb-2"><strong>Vision:</strong> {startup.vision || 'N/A'}</p>
        <p className="text-text"><strong>Description:</strong> {startup.description || 'No description available.'}</p>
      </div>

      {!isOwner && user && (
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-text mb-4">Apply to Join</h2>
          <form onSubmit={handleApply} className="space-y-4">
            <div>
              <label className="block text-text font-medium mb-2">Message</label>
              <textarea
                value={applicationMessage}
                onChange={(e) => setApplicationMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text h-32 resize-y"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white p-3 rounded-md hover:bg-blue-700 transition"
            >
              Submit Application
            </button>
          </form>
        </div>
      )}

      {isOwner && (
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-text mb-4">Applications</h2>
          {applications.length === 0 ? (
            <p className="text-text">No applications yet.</p>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="border p-4 rounded-md">
                  <p className="text-text"><strong>Applicant:</strong> {app.applicant.email}</p>
                  <p className="text-text mb-2"><strong>Message:</strong> {app.message}</p>
                  <p className="text-text mb-2"><strong>Status:</strong> {app.status || 'Pending'}</p>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleApplicationStatus(app.id, 'accepted')}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                      disabled={app.status !== 'pending'}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleApplicationStatus(app.id, 'rejected')}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                      disabled={app.status !== 'pending'}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}