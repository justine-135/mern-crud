import Post from "./post";

const Posts = ({ posts, setPosts }) => {
  return (
    <div className="posts">
      {posts &&
        posts.map((post) => {
          return (
            <Post
              key={post._id}
              posts={posts}
              post={post}
              setPosts={setPosts}
            />
          );
        })}
    </div>
  );
};

export default Posts;
