import React from "react";
import { Link } from "react-router-dom";
import { Post } from "../../store/slices/postSlice";

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/posts/${post.id}`} className="block">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {post.title}
        </h3>
        <p className="text-gray-600 line-clamp-3">{post.content}</p>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>Por: {post.user.name}</span>
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>
      </Link>
    </div>
  );
};

export default React.memo(PostCard);
