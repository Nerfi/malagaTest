import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAuth } from "../../AuthContext/AuthContext";
import "./styles.css";

interface SinglePost {
  id: Number;
  title: string;
  userId: Number;
}

const SinglePost = () => {
  const [singlePost, setSinglePost] = useState<SinglePost>();
  const { token } = useAuth();
  const { id } = useParams();
  // /post/2
  const apiUrl = process.env.REACT_APP_API_URL! + `/post/${id}`;

  const IMG_URL_FAKE =
    "https://images.unsplash.com/photo-1686370763846-936d3ed69b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=320&q=60";

  useEffect(() => {
    try {
      const fetchSinglePost = async () => {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await fetch(apiUrl, { headers });
        const postsResponseData: SinglePost = await response.json();

        setSinglePost(postsResponseData);
      };

      fetchSinglePost();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }, [id]);

  return (
    <div className="postWrapper">
      <div className="postContainer">
        {singlePost && (
          <div className="card">
            <img src={IMG_URL_FAKE} alt="Avatar" />
            <div className="container">
              <h4>{singlePost.title}</h4>

              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Exercitationem nulla autem veritatis mollitia vitae cum. Ullam,
                rem ab? Enim adipisci, debitis magni sequi nostrum repellat
                molestiae quisquam mollitia voluptates dolor.{" "}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
