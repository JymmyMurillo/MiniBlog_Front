import React from "react";
import { Comment } from "../../types";

interface Props {
  comments: Comment[];
}

const CommentList: React.FC<Props> = React.memo(({ comments }) => {
  return (
    <div className="mt-4 space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium">{comment.user.name}</span>
            <span className="text-gray-500">
              {new Date(comment.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="mt-2 text-gray-700">{comment.content}</p>
        </div>
      ))}
    </div>
  );
});

export default CommentList;
