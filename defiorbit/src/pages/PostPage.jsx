import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { useAuth } from '../context/AuthContext';
import Comment from '../components/Comment';
import { formatDistanceToNow } from 'date-fns';

export default function PostPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editedImageUrl, setEditedImageUrl] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    setLoading(true); // Set loading to true at the start
    setError(null); // Reset error state
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (!data) {
        throw new Error('Post not found');
      }

      setPost(data);
      setEditedTitle(data.title);
      setEditedContent(data.content || '');
      setEditedImageUrl(data.image_url || '');
    } catch (err) {
      console.error('Error fetching post:', err.message);
      setError('Failed to load post. It may have been deleted or doesn’t exist.');
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setComments(data || []);
    } catch (err) {
      console.error('Error fetching comments:', err.message);
    }
  };

  const handleUpvote = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update({ upvotes: post.upvotes + 1 })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setPost(data);
    } catch (err) {
      console.error('Error upvoting post:', err.message);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please log in to comment.');

    try {
      const { error } = await supabase.from('comments').insert({
        post_id: id,
        user_id: user.id,
        content: newComment,
      });

      if (error) throw error;

      setNewComment('');
      fetchComments();
    } catch (err) {
      console.error('Error posting comment:', err.message);
    }
  };

  const handleEdit = async () => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({
          title: editedTitle,
          content: editedContent,
          image_url: editedImageUrl,
        })
        .eq('id', id);

      if (error) throw error;

      setIsEditing(false);
      fetchPost();
    } catch (err) {
      console.error('Error updating post:', err.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await supabase.from('comments').delete().eq('post_id', id);
        await supabase.from('posts').delete().eq('id', id);
        navigate('/');
      } catch (err) {
        console.error('Error deleting post:', err.message);
      }
    }
  };

  if (loading) return <div className="text-starlight text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      {isEditing ? (
        <div className="card max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-starlight mb-4">Edit Post</h2>
          <div className="mb-4">
            <label className="block text-starlight mb-2">Title</label>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="mb-4">
            <label className="block text-starlight mb-2">Content</label>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="input-field"
              rows="4"
            />
          </div>
          <div className="mb-4">
            <label className="block text-starlight mb-2">Image URL</label>
            <input
              type="url"
              value={editedImageUrl}
              onChange={(e) => setEditedImageUrl(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleEdit}
              className="btn-nebula"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-opacity-80"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="card max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-starlight mb-2">{post.title}</h1>
          <p className="text-sm text-gray-400 mb-4">
            Posted {formatDistanceToNow(new Date(post.created_at))} ago
          </p>
          {post.content && <p className="text-starlight mb-4">{post.content}</p>}
          {post.image_url && (
            <img
              src={post.image_url}
              alt="Post"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
          )}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={handleUpvote}
              className="btn-nebula"
            >
              Upvote ({post.upvotes})
            </button>
            {user?.id === post.user_id && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-opacity-80"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-opacity-80"
                >
                  Delete
                </button>
              </>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-bold text-starlight mb-4">Comments</h2>
            <form onSubmit={handleCommentSubmit} className="mb-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="input-field"
                rows="3"
                placeholder="Add a comment..."
                required
              />
              <button
                type="submit"
                className="btn-nebula mt-2"
              >
                Post Comment
              </button>
            </form>
            {comments.length > 0 ? (
              comments.map((comment) => ( // Fixed the typo here
                <Comment key={comment.id} comment={comment} />
              ))
            ) : (
              <p className="text-starlight">No comments yet. Be the first!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}