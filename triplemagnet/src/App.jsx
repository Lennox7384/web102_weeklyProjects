import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import HomePage from './pages/HomePage';
import FeedPage from './pages/FeedPage';
import SummaryPage from './pages/SummaryPage';
import CreateStartupPage from './pages/CreateStartupPage';
import EditStartupPage from './pages/EditStartupPage';
import StartupDetailPage from './pages/StartupDetailPage';
import LoginPage from './pages/LoginPage';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Header */}
        <nav className="bg-secondary text-primary p-4 shadow-md">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
            <Link
              to="/"
              className="relative text-primary text-2xl font-bold mb-2 sm:mb-0 opacity-100 static-underline"
            >
              Startup Teams
            </Link>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Link
                to="/feed"
                className="relative text-primary font-medium opacity-100 header-link"
              >
                Feed
              </Link>
              {user ? (
                <>
                  <Link
                    to="/my-startups"
                    className="relative text-primary font-medium opacity-100 header-link"
                  >
                    My Startups
                  </Link>
                  <Link
                    to="/create-startup"
                    className="relative text-primary font-medium opacity-100 header-link"
                  >
                    Create Startup
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="relative text-primary font-medium opacity-100 header-link"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="relative text-primary font-medium opacity-100 header-link"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={user ? <HomePage user={user} /> : <LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/my-startups" element={user ? <SummaryPage user={user} /> : <LoginPage />} />
            <Route path="/create-startup" element={user ? <CreateStartupPage /> : <LoginPage />} />
            <Route path="/edit-startup/:id" element={user ? <EditStartupPage /> : <LoginPage />} />
            <Route path="/startups/:id" element={<StartupDetailPage user={user} />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer
          className="bg-primary text-white p-6 border-t border-blue-600"
          style={{ backgroundColor: '#1D4ED8' }} // Fallback deep blue background
        >
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Navigation Links */}
            <div className="flex flex-col items-center md:items-start space-y-2">
              <h3 className="text-lg font-medium opacity-100">Explore</h3>
              <div className="flex flex-col space-y-1">
                <Link to="/" className="text-white font-medium opacity-100 hover:text-blue-200 transition-colors duration-300">
                  Home
                </Link>
                <Link to="/feed" className="text-white font-medium opacity-100 hover:text-blue-200 transition-colors duration-300">
                  Feed
                </Link>
                <a
                  href="mailto:support@startupteams.com"
                  className="text-white font-medium opacity-100 hover:text-blue-200 transition-colors duration-300"
                >
                  Contact Us
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-white font-medium opacity-100">
                © {new Date().getFullYear()} Startup Teams. All rights reserved.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-col items-center md:items-end space-y-2">
              <h3 className="text-lg font-medium opacity-100">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-medium opacity-100 hover:text-blue-200 transition-colors duration-300"
                >
                  Twitter
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-medium opacity-100 hover:text-blue-200 transition-colors duration-300"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-medium opacity-100 hover:text-blue-200 transition-colors duration-300"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;