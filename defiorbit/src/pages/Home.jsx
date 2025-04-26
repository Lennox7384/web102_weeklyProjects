import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('created_at');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [sortBy]);

  const fetchPosts = async () => {
    let query = supabase
      .from('posts')
      .select('*')
      .order(sortBy, { ascending: false });

    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchPosts();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-starlight mb-4">Welcome to DeFiOrbit</h1>
      <p className="text-starlight mb-6">Your cosmic hub for DeFi discussions!</p>
      
      <PostForm />

      <div className="my-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search posts by title..."
          value={search}
          onChange={handleSearch}
          className="p-2 rounded-lg bg-gray-800 text-starlight border border-nebula focus:outline-none"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 rounded-lg bg-gray-800 text-starlight border border-nebula focus:outline-none"
        >
          <option value="created_at">Sort by Date</option>
          <option value="upvotes">Sort by Upvotes</option>
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}