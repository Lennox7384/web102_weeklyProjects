import { formatDistanceToNow } from 'date-fns';

export default function Comment({ comment }) {
  return (
    <div className="bg-gray-800 p-3 rounded-lg mt-2">
      <p className="text-starlight">{comment.content}</p>
      <p className="text-sm text-gray-400">
        Posted {formatDistanceToNow(new Date(comment.created_at))} ago
      </p>
    </div>
  );
}