import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import PostCard from "../components/posts/PostCard";
import { fetchPosts } from "../store/slices/postSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";

const Posts = () => {
  const dispatch = useAppDispatch();
  const { posts, status } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (status === "loading") return <div>Cargando posts...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
