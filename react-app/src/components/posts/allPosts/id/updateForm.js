import axios from "axios";

const UpdateForm = ({
  updateForm,
  setUpdateForm,
  index,
  setOpenUpdatePost,
}) => {
  const handleChangeUpdate = (e) => {
    const newForm = { ...updateForm };
    newForm[e.target.id] = e.target.value;
    setUpdateForm(newForm);
  };

  const handleFormUpdate = async (e) => {
    e.preventDefault();
    try {
      const _id = updateForm._id;
      await axios.put(`/api/posts/${_id}`, {
        title: updateForm.title,
        body: updateForm.body,
        likes: updateForm.likes,
        tags: updateForm.tags.split(","),
      });
      setOpenUpdatePost(null);
      index();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      action=""
      onSubmit={(e) => {
        handleFormUpdate(e);
      }}
    >
      <input
        type="text"
        name="title"
        value={updateForm.title}
        placeholder="Enter title"
        id="title"
        onChange={(e) => handleChangeUpdate(e)}
      />
      <textarea
        name="body"
        id="body"
        value={updateForm.body}
        default={updateForm.body}
        onChange={(e) => handleChangeUpdate(e)}
      />
      <input
        type="text"
        name="tags"
        value={updateForm.tags}
        placeholder="tags"
        id="tags"
        onChange={(e) => handleChangeUpdate(e)}
      />
      <input type="submit" value="Update" />
    </form>
  );
};

export default UpdateForm;
