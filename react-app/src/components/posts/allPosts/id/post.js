import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Comments from "../../comments/comments";
import axios from "axios";
const Post = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);

  useEffect(() => {
    const index = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    index();
  }, []);

  return (
    <div className="post-container">
      <div className="post">
        {post && (
          <div>
            <Link to="/">Back</Link>
            <h1>{post.title}</h1>
            <ul className="tags-ul">
              {post.tags.map((tag, index) => {
                return (
                  <li key={index}>
                    <span>#</span>
                    {tag}
                  </li>
                );
              })}
            </ul>
            <pre>{post.body}</pre>
            <Comments _id={post._id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
