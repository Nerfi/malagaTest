import { useState } from "react";
import { useParams } from "react-router";
import { CreateForm } from "../CreatePost/CreatePost";
import { useAuth } from "../../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import toastNotification from "../UI/Toas";

const UpdatePost = () => {
  const { id } = useParams();

  const apiUrl = process.env.REACT_APP_API_URL! + `/post/${id}/update`;

  //token
  const { token } = useAuth();
  //navigation
  const navigate = useNavigate();

  const [postData, setPostData] = useState<CreateForm>({
    title: "",
    description: "",
  });

  //console.log(id, "ID");
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
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
        toastNotification("success", "Post actualizado  exitosamente");
        setTimeout(() => {
          navigate("/");
        }, 1800);
      } else {
        toastNotification("error", "Hemos tenido un error ");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostData((prevDataCreate) => ({
      ...prevDataCreate,
      [name]: value,
    }));
  };
  return (
    <div className="formWrapper">
      <div className="formContainer">
        <div className="formTitle">
          <h3>Update A Post</h3>
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

export default UpdatePost;
