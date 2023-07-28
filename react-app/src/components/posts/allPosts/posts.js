import Post from "./post";

const Posts = ({ posts, setPosts, index, filterTags, setFilterTags }) => {
  return (
    <div className="posts-container">
      <div className="posts">
        {posts &&
          posts.map((post) => {
            if (filterTags.every((tags) => post.tags.indexOf(tags) >= 0)) {
              return (
                <Post
                  key={post._id}
                  posts={posts}
                  post={post}
                  setPosts={setPosts}
                  index={index}
                  filterTags={filterTags}
                  setFilterTags={setFilterTags}
                />
              );
            }
          })}
      </div>
    </div>
  );
};

export default Posts;
