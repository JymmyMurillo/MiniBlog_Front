import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import PostCard from "../components/posts/PostCard";
import { loadPosts } from "../store/slices/postSlice";

const Posts = () => {
  const dispatch = useDispatch();
  const { items: posts, status } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(loadPosts({ page: 1, limit: 10 }));
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
