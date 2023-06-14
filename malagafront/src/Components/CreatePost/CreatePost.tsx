import { useState } from "react";
import "./styles.css";
import { useAuth } from "../../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

interface CreateForm {
  title: string;
  description: string;
}

const apiUrl = process.env.REACT_APP_API_URL! + "/posts";

const CreatePost = () => {
  const [postData, setPostData] = useState<CreateForm>({
    title: "",
    description: "",
  });

  //token
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostData((prevDataCreate) => ({
      ...prevDataCreate,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: postData.title,
          description: postData.description,
        }),
      });
      if (response.ok) {
        navigate("/");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

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
              value={postData.title}
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
              value={postData.description}
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

export default CreatePost;
