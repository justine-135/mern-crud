import axios from "axios";
import { Link } from "react-router-dom";

const Post = ({ post, index, filterTags, setFilterTags }) => {
  const handleLike = async (_id) => {
    try {
      await axios.put(`/api/like/${_id}`);
      index();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterTags = (tag) => {
    const exist = filterTags.indexOf(tag) > -1;
    if (!exist) {
      setFilterTags([...filterTags, tag]);
    }
  };

  return (
    <div className="post" key={post._id}>
      <ul className="tags-ul">
        {post.tags.map((tag, index) => {
          return (
            <li key={index}>
              <span>#</span>
              <input
                type="button"
                name={tag}
                value={tag}
                onClick={() => handleFilterTags(tag)}
              />
            </li>
          );
        })}
      </ul>
      <div>
        <p>{post.body} </p>
        <h3>{post.title}</h3>
        <div className="btn-group">
          <button onClick={() => handleLike(post._id)}>
            Like <span>{post.likes}</span>
          </button>
          <Link to={`/${post._id}`}>View</Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
