import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { blogDeleted, selectBlogById } from "../reducers/blogSlice";
import ShowTime from "./ShowTime";
import ShowAuthor from "./ShowAuthor";
import ReactionButtons from "./ReactionButtons";

const SingleBlogPage = () => {
  const { blogId } = useParams();
  const blog = useSelector((state) => selectBlogById(state, blogId));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!blog) {
    return (
      <section>
        <h2>Sorry, there is no post in this address 🫣 </h2>
      </section>
    );
  }

  const handleDelete = () => {
    if (blog) {
      dispatch(blogDeleted({ id: blog.id }));
      navigate("/");
    }
  };

  return (
    <section>
      <article className="blog">
        <h2>{blog.title}</h2>
        <p className="blog-content">{blog.body}</p>
        <ReactionButtons blog={blog} />
        
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <ShowTime timestamp={blog.date} />
          <ShowAuthor userId={blog.user} />
        </div>

        <div style={{ marginTop: "16px", display: "flex", gap: "12px" }}>
          <Link to={`/editBlog/${blog.id}`} className="button">
            Edit
          </Link>
          <button onClick={handleDelete}>Delete</button>
          <Link to={"/"}>Back</Link>
        </div>
      </article>
    </section>
  );
};

export default SingleBlogPage;
