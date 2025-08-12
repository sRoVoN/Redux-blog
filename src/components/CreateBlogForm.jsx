import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { blogAdded } from "../reducers/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../reducers/userSlice";

const CreateBlogForm = () => {
  const [title, setTitle] = useState("");
  const [body, setbody] = useState("");
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector( selectAllUsers);


  const onTitleChange = (e) => setTitle(e.target.value);
  const onbodyChange = (e) => setbody(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);

  const canSave = [title, body, userId].every(Boolean);
  const handleSubmitForm = () => {
    if (canSave) {
      dispatch(blogAdded(title, body, userId));
      setTitle(" ");
      setbody(" ");
      setUserId(" ");
      navigate("/");
    }
  };


  return (
    <section>
      <h2> Creat New Post</h2>
      <form autoComplete="off">
        <label htmlFor="blogTitle"> Title </label>
        <input
          type="text"
          id="blogTitle"
          name="blogTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="blogAuthor">Author</label>
        <select id="blogAuthor" value={userId} onChange={onAuthorChange}>
          <option style={{ marginLeft: "5px" }} value="">
            {" "}
            select an author
          </option>
          {users.map( user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
            )
          )}
        </select>
        <label htmlFor="blogbody">Main body </label>
        <textarea
          id="blogbody"
          name="blogbody"
          value={body}
          onChange={onbodyChange}
        />
        <button type="submit"
         onClick={handleSubmitForm}
         disabled={!canSave}
         >
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
