import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

export default function PostCard({ post }) {
  return (
    <Link to={`/post/${post.id}`}>
      <div className="bg-cosmic p-4 rounded-lg shadow-lg hover:bg-opacity-90 transition">
        <h3 className="text-xl font-bold text-starlight">{post.title}</h3>
        <p className="text-sm text-gray-400">
          Posted {formatDistanceToNow(new Date(post.created_at))} ago
        </p>
        <p className="text-starlight mt-2">Upvotes: {post.upvotes}</p>
      </div>
    </Link>
  );
}