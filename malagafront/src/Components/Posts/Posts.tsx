import { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext/AuthContext";
import { Link } from "react-router-dom";
import "./styles.css";
///shared card component
//NO OLVIDAR USARLO
import PostsCards from "../UI/Cards";
import { useNavigate } from "react-router-dom";
import toastNotification from "../UI/Toas";

interface Post {
  title: string;
  id: number;
}

const IMG_URL_FAKE =
  "https://images.unsplash.com/photo-1686370763846-936d3ed69b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=300&q=40";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>();
  const navigate = useNavigate();

  const { token } = useAuth();
  const apiUrl = process.env.REACT_APP_API_URL! + "/posts";

  useEffect(() => {
    try {
      const fetchAllPosts = async () => {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await fetch(apiUrl, { headers });
        const postsResponseData = await response.json();
        setPosts(postsResponseData);
      };

      fetchAllPosts();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }, []);

  const handleDelete = async (id: number) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const deletePost = async () => {
        const response = await fetch(apiUrl + `/${id}`, {
          method: "DELETE",
          headers,
        });

        if (!response.ok) {
          const { error } = await response.json();
          toastNotification("error", error);
          return;
        }
        //updating the state in order to reflex changes
        setPosts((prevPosts) => prevPosts!.filter((post) => post.id !== id));

        toastNotification("success", "Post eliminado con exito");
        setTimeout(() => {
          navigate("/");
        }, 1800);
      };

      deletePost();
    } catch (error: any) {
      toastNotification("error", error.message);
    }
  };

  return (
    <div className="postsWrapper">
      <div className="postsContainer">
        {posts?.map((post: { title: string; id: number }) => {
          return (
            <div className="card" key={post.id}>
              <img src={IMG_URL_FAKE} alt="Avatar" />
              <div className="container">
                <Link to={`/post/${post.id}`}>
                  <h4>{post.title}</h4>
                </Link>
                <div className="postBtns">
                  <button
                    className="postDeleteBtn"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete Post
                  </button>
                  <button
                    className="postsUpdateBtn"
                    onClick={() =>
                      navigate(`/update/${post.id}`, { state: post.id })
                    }
                  >
                    Update Post
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
