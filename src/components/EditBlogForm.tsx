import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { blogUpdated, selectBlogById } from "../reducers/blogSlice";

const EditBlogForm = () => {
  const { blogId } = useParams();
  const blog = useSelector((state) => selectBlogById(state, blogId));
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setBody(blog.body);
    }
  }, [blog]);

  if (!blog) {
    return (
      <section>
        <h2>Sorry, there is no post in this address 🫣 </h2>
        <Link to="/">Back to home</Link>
      </section>
    );
  }

const handleSubmitForm = (e) => {
  e.preventDefault();
  if (title && body) {
    dispatch(blogUpdated({ id: blogId, title, body }));
    navigate(`/blogs/${blogId}`);
  }
};


  return (
    <section>
      <h2>Edit Post</h2>
      <form autoComplete="off" onSubmit={handleSubmitForm}>
        <label htmlFor="blogTitle">Title</label>
        <input
          type="text"
          id="blogTitle"
          name="blogTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="blogbody">Main body</label>
        <textarea
          id="blogbody"
          name="blogbody"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">Edit</button>
        <Link to={"/"} style={{ marginLeft: "22px" }}>
          Back
        </Link>
      </form>
    </section>
  );
};

export default EditBlogForm;
