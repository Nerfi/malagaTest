import "./App.css";
//routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import NoMatch from "./Components/NotFound/NotFound";
import Posts from "./Components/Posts/Posts";
//importing navigation
import Navbar from "./Components/Navbar/Navbar";
import ProtectedRoute from "./Routes/ProtectedRoutes";
import AuthProvider from "./AuthContext/AuthContext";
import Footer from "./Components/Footer/Footer";
import SinglePost from "./Components/SinglePost/SinglePosts";
import UpdatePost from "./Components/UpdatePost/UpdatePost";
import CreatePost from "./Components/CreatePost/CreatePost";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route
              path="/post/:id"
              element={
                <ProtectedRoute>
                  <SinglePost />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/posts"
              element={
                <ProtectedRoute>
                  <Posts />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create/post"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/update/:id"
              element={
                <ProtectedRoute>
                  <UpdatePost />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Router>
      </AuthProvider>
      <ToastContainer />
      {/* <Footer /> */}
    </>
  );
}

export default App;
