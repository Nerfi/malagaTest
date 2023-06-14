import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAuth } from "../../AuthContext/AuthContext";
import "./styles.css";
import Spinner from "../UI/Spinner";

interface SinglePost {
  id: Number;
  title: string;
  userId: Number;
  description: string;
}

const SinglePost = () => {
  const [singlePost, setSinglePost] = useState<SinglePost>();
  const [loading, setLoading ] =useState(true);
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
        setLoading(false); 
      };

      fetchSinglePost();
    } catch (error: any) {
      setLoading(false); 
      throw new Error(error.message);
    }
  }, [id]);


  if (loading) {
    return <Spinner/>
  }

  return (
    <div className="postWrapper">
      <div className="postContainer">
        {singlePost && (
          <div className="card">
            <img src={IMG_URL_FAKE} alt="Avatar" />
            <div className="container">
              <h4>{singlePost.title}</h4>

              <p>{singlePost.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
