import { useState } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from '../context/AuthContext';

export default function PostForm() {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('Please log in to create a post.');
      return;
    }

    const { error } = await supabase.from('posts').insert({
      user_id: user.id,
      title,
      content,
      image_url: imageUrl,
    });

    if (error) {
      setError(error.message);
    } else {
      setTitle('');
      setContent('');
      setImageUrl('');
      setError(null);
      window.location.reload();
    }
  };

  return (
    <div className="cosmic-card w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
      <h2 className="gradient-text mb-6 sm:mb-8 text-center">Create a Post</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            placeholder=" "
            required
          />
          <label className="input-label">Title</label>
        </div>
        <div className="input-wrapper">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input-field"
            rows="3 sm:rows-4"
            placeholder=" "
          />
          <label className="input-label">Content (Optional)</label>
        </div>
        <div className="input-wrapper">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="input-field"
            placeholder=" "
          />
          <label className="input-label">Image URL (Optional)</label>
        </div>
        <button type="submit" className="btn-nebula w-full">
          Create Post
        </button>
      </form>
    </div>
  );
}