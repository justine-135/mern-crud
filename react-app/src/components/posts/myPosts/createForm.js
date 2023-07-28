import axios from "axios";

const CreateForm = ({ form, setForm, index, setOpenCreatePost }) => {
  const handleChange = (e) => {
    const newForm = { ...form };
    newForm[e.target.id] = e.target.value;
    setForm(newForm);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setForm({
      ...form,
      tags: form.tags.split(","),
    });

    try {
      await axios
        .post("/api/posts", {
          title: form.title,
          body: form.body,
          likes: form.likes,
          tags: form.tags.split(","),
        })
        .then(function (response) {
          index();
          setOpenCreatePost(false);
        })
        .catch(function (error) {
          console.log(error.response.data);
        })
        .finally(function () {
          setForm({ title: "", body: "", tags: "" });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      action=""
      onSubmit={(e) => {
        handleFormSubmit(e);
      }}
    >
      <input
        type="text"
        name="title"
        value={form.title}
        placeholder="Enter title"
        id="title"
        onChange={(e) => handleChange(e)}
      />
      <textarea
        name="body"
        value={form.body}
        placeholder="Enter body"
        id="body"
        onChange={(e) => handleChange(e)}
      />

      <input
        type="text"
        name="tags"
        value={form.tags}
        placeholder="tags"
        id="tags"
        onChange={(e) => handleChange(e)}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default CreateForm;
