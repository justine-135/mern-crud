import { useState } from "react";
import axios from "axios";

const CreateForm = ({ _id, comments, setComments }) => {
  const [commentForm, setCommentForm] = useState({
    _id: _id,
    comment: "",
  });

  const [textareaheight, setTextareaheight] = useState(1);
  const [trows, setTrows] = useState();

  const handleComment = (e) => {
    const newForm = { ...commentForm };
    newForm[e.target.id] = e.target.value;
    if (e.target.id === "comment") {
      const height = e.target.scrollHeight;
      const rowHeight = 25;
      const trowsCeil = Math.ceil(height / rowHeight) - 1;

      if (trowsCeil > textareaheight) {
        setTextareaheight(trowsCeil);
      }

      if (e.target.value == "") {
        setTextareaheight(1);
      }
    }

    setCommentForm(newForm);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("/api/comment", {
          _id: commentForm._id,
          comment: commentForm.comment,
        })
        .then(function (response) {
          setComments([...comments, response.data]);
          setCommentForm({
            _id: _id,
            comment: "",
          });
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {});
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form className="comment-form" onSubmit={(e) => handleSubmitComment(e)}>
      <textarea
        name="comment"
        id="comment"
        onChange={(e) => {
          handleComment(e);
        }}
        placeholder="Share you thoughts .."
        suppressContentEditableWarning={true}
        default={commentForm.comment}
        rows={textareaheight}
      />
      <input type="submit" value="Post" />
    </form>
  );
};

export default CreateForm;
