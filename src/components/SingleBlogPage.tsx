import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { blogDeleted, selectBlogById } from "../reducers/blogSlice";
import ShowTime from "./ShowTime";
import ShowAuthor from "./ShowAuthor";
import ReactionButtons from "./ReactionButtons";
import type { RootState, AppDispatch } from "../types";

const SingleBlogPage: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  if (!blogId) {
    return <p>Invalid blog ID</p>;
  }

  const blog = useSelector((state: RootState) => selectBlogById(state, blogId));

  if (!blog) {
    return (
      <section>
        <h2>Sorry, there is no post in this address 🫣 </h2>
      </section>
    );
  }

  const handleDelete = () => {
    dispatch(blogDeleted(blogId));
    navigate("/");
  };

  return (
    <section>
      <article className="blog">
        <h2>{blog.title}</h2>
        <p className="blog-content">{blog.body}</p>

        <ReactionButtons blogId={blog.id} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <ShowAuthor userId={blog.userId} />
          <ShowTime timestamp={blog.date} />
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
