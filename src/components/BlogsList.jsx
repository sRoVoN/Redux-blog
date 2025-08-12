import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectAllBlogs } from "../reducers/blogSlice";
import ShowTime from "./ShowTime";
import ShowAuthor from "./ShowAuthor";
import ReactionButtons from "./ReactionButtons";

const BlogsList = () => {
  const blogs = useSelector(selectAllBlogs);
  const navigate = useNavigate();

  const orderedBlogs = blogs
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedBlogs = orderedBlogs.map((blog) => (
    <article className="blog-excerpt" key={blog.id}>
      <h3>{`🗒 ${blog.title}`}</h3>
      <p className="blog-content">
        {blog.body ? blog.body.slice(0, 100) : "No content available."}
      </p>
      <ReactionButtons blog={blog} />
      <Link to={`/blogs/${blog.id}`} className="button muted-button">
        more...
      </Link>
      <ShowAuthor userId={blog.user} />
      <ShowTime timestamp={blog.date} />
    </article>
  ));

  return (
    <section className="blog-list">
      <button
        className="full-button accent-button"
        onClick={() => navigate("/blogs/created-blog")}
        style={{ marginTop: "8px" }}
      >
        📨 New post
      </button>
      <h2>📃 All Posts</h2>
      {renderedBlogs}
    </section>
  );
};

export default BlogsList;
