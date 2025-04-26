import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signIn(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-3 sm:p-4">
      <div className="cosmic-card w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
        <h1 className="gradient-text mb-6 sm:mb-8 text-center">Login to DeFiOrbit</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder=" "
              required
            />
            <label className="input-label">Email</label>
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder=" "
              required
            />
            <label className="input-label">Password</label>
          </div>
          <button type="submit" className="btn-nebula w-full">
            Login
          </button>
        </form>
        <p className="text-starlight mt-4 sm:mt-6 text-center text-xs sm:text-sm">
          Don’t have an account? <Link to="/signup" className="text-nebula hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}