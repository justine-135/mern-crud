import axios from "axios";

const UpdateForm = ({ updateForm, setUpdateForm, index }) => {
  const handleChangeUpdate = (e) => {
    const newForm = { ...updateForm };
    newForm[e.target.id] = e.target.value;
    setUpdateForm(newForm);
  };

  const handleFormUpdate = async (e) => {
    e.preventDefault();
    const _id = updateForm._id;

    console.log(updateForm);
    const res = await axios
      .put(`http://localhost:5000/api/posts/${_id}`, {
        title: updateForm.title,
        body: updateForm.body,
        category: updateForm.category.split(","),
        likes: updateForm.likes,
        tags: updateForm.tags.split(","),
      })
      .then(function (response) {
        index();
      })
      .catch(function (error) {
        console.log(error.response.data);
      })
      .finally(function () {
        setUpdateForm(null);
      });
  };

  const handleCancelUpdate = () => {
    setUpdateForm(null);
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
      <input
        type="text"
        name="body"
        value={updateForm.body}
        placeholder="Enter body"
        id="body"
        onChange={(e) => handleChangeUpdate(e)}
      />
      <input
        type="text"
        name="category"
        value={updateForm.category}
        placeholder="Enter category"
        id="category"
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
      <input type="button" value="Cancel" onClick={handleCancelUpdate} />
    </form>
  );
};

export default UpdateForm;
