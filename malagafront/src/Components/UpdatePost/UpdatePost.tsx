import { useParams } from "react-router";

const UpdatePost = () => {
    const { id } = useParams();
    console.log(id,"ID")
  const handleSubmit = () => {};
  const handleChange = () => {};
  return (
    <div className="formWrapper">
      <div className="formContainer">
        <div className="formTitle">
          <h3>Create A New Post</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputForm">
            <label>Title </label>
            <input
              type="text"
              name="title"
              // value={postData.title}
              required
              onChange={handleChange}
              placeholder="Title"
            />
          </div>

          <div className="inputForm">
            <label> Description </label>
            <input
              type="text"
              name="description"
              // value={postData.description}
              required
              onChange={handleChange}
              placeholder="Description"
            />
          </div>

          <div className="buttonContainer">
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};


export default UpdatePost;
