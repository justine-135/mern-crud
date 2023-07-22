import axios from "axios";

const CreateForm = ({ form, setForm, index }) => {
  const handleChange = (e) => {
    const newForm = { ...form };
    newForm[e.target.id] = e.target.value;
    setForm(newForm);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setForm({
      ...form,
      category: form.category.split(","),
      tags: form.tags.split(","),
    });

    const res = await axios
      .post("http://localhost:5000/api/posts", {
        title: form.title,
        body: form.body,
        category: form.category.split(","),
        likes: form.likes,
        tags: form.tags.split(","),
      })
      .then(function (response) {
        index();
      })
      .catch(function (error) {
        console.log(error.response.data);
      })
      .finally(function () {
        setForm({ title: "", body: "", category: "", tags: "" });
      });
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
      <input
        type="text"
        name="body"
        value={form.body}
        placeholder="Enter body"
        id="body"
        onChange={(e) => handleChange(e)}
      />
      <input
        type="text"
        name="category"
        value={form.category}
        placeholder="Enter category"
        id="category"
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
