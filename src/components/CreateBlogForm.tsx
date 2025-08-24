import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { blogAdded } from "../reducers/blogSlice";
import { selectAllUsers } from "../reducers/userSlice";
import { AppDispatch, RootState } from "src/types";
const CreateBlogForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();
 const dispatch = useDispatch<AppDispatch>();
 const users = useSelector((state: RootState) => selectAllUsers(state)); 

  const canSave = [title, body, userId].every(Boolean);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (canSave) {
    dispatch(blogAdded(title, body, userId));
    setTitle("");
    setBody("");
    setUserId("");
    navigate("/");
  }
};


  return (
    <section>
      <h2>Create New Post</h2>
      <form autoComplete="off" onSubmit={handleSubmitForm}>
        <label htmlFor="blogTitle">Title</label>
        <input
          type="text"
          id="blogTitle"
          name="blogTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="blogAuthor">Author</label>
        <select
          id="blogAuthor"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="">Select an author</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <label htmlFor="blogBody">Main body</label>
        <textarea
          id="blogBody"
          name="blogBody"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <button type="submit" disabled={!canSave}>
          Save
        </button>
        <Link to={"/"} style={{ marginLeft: "22px" }}>
          Back
        </Link>
      </form>
    </section>
  );
};

export default CreateBlogForm;
