import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogService";
import userService from "./services/userService";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import "./components/Blog.css";

const App = () => {
  // 1 state
  const [blogs, setBlogs] = useState([]);
  // 2 state
  const [user, setUser] = useState(null);
  // 3 state
  const [username, setUsername] = useState("");
  // 4 state
  const [password, setPassword] = useState("");
  // 5 state
  const [errorMessage, setErrorMessage] = useState(null);

  const userServices = userService();
  const blogServices = blogService();

  useEffect(() => {
    blogServices.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (!loggedUser) return;
    const user = JSON.parse(loggedUser);
    setUser(user);
    blogServices.setToken(user.token);
  }, []);

  useEffect(() => {
    if (errorMessage) window.alert(errorMessage);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  }, [errorMessage]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await userServices.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogServices.setToken(user.token);

      setUser(user);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage(error);
      }
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  const doLogOut = async () => {
    setUser(null);
    window.localStorage.clear();
  };

  const blogFormRef = useRef();

  const addBlog = async (newBlog) => {
    try {
      const result = await blogServices.create(newBlog);
      setBlogs(blogs.concat(result));
      blogFormRef.current.toggleVisibility();
      window.alert("Success! A new blog added.");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage(error);
      }
    }
  };

  const blogForm = () => {
    return (
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    );
  };

  return (
    <div>
      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          handlePasswordChange={setPassword}
          handleUsernameChange={setUsername}
          username={username}
          password={password}
        />
      )}
      {user && (
        <div>
          <h2>blogs</h2>
          <span>{user.name} is logged in</span>
          <button onClick={doLogOut}>log out</button>

          <h2>Create new</h2>
          {blogForm()}
          {blogs.map((blog) => (
            <div key={blog.id} className="blog">
              <span>{blog.title}</span>
              <Togglable buttonLabel="view">
                <Blog blog={blog} />
              </Togglable>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
