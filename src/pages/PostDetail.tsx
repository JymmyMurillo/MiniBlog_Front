import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { fetchPosts, selectPostById } from "../store/slices/postSlice";
import CommentList from "../components/comments/CommentList";
import CommentForm from "../components/comments/CommentForm";
import PostCard from "../components/posts/PostCard";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) => selectPostById(Number(id))(state));
  const { status } = useAppSelector((state) => state.posts);

  useEffect(() => {
    if (!post) dispatch(fetchPosts());
  }, [dispatch, post]);

  if (status === "loading")
    return <div className="text-center py-4">Cargando...</div>;
  if (!post) return <div className="text-center py-4">Post no encontrado</div>;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <PostCard post={post} />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Comentarios ({post.comments.length})
        </h2>
        <CommentForm postId={post.id} />
        <CommentList comments={post.comments} />
      </div>
    </div>
  );
};

export default PostDetail;
