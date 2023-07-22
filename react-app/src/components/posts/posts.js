import Post from "./post";

const Posts = ({ posts, setPosts, setUpdateForm }) => {
  return (
    <div>
      {posts &&
        posts.map((post) => {
          return (
            <Post
              posts={posts}
              post={post}
              setPosts={setPosts}
              setUpdateForm={setUpdateForm}
            />
          );
        })}
    </div>
  );
};

export default Posts;
