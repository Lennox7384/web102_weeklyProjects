import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Sign-up successful! Please check your email to confirm.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-text text-center">
        {isSignUp ? 'Sign Up' : 'Login'}
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 max-w-md mx-auto">
          {error}
        </div>
      )}

      <form onSubmit={handleAuth} className="bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-md mx-auto space-y-6">
        <div>
          <label className="block text-text font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-text font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
            required
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white p-3 rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out font-medium border border-transparent hover:border-blue-700 shadow-sm hover:shadow-md hover:scale-105 cursor-pointer disabled:bg-gray-400 disabled:shadow-none disabled:scale-100 disabled:cursor-not-allowed"
          disabled={loading}
          style={{ backgroundColor: '#1D4ED8' }} // Fallback background color
        >
          {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Login'}
        </button>
        <p className="text-center text-text">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary hover:underline"
            disabled={loading}
          >
            {isSignUp ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </form>
    </div>
  );
}