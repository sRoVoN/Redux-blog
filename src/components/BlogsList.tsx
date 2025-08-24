import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectBlogIds } from "../reducers/blogSlice";
import BlogItem from "./BlogItem";
import type { RootState } from "../types";

const BlogList: React.FC = () => {
  const blogIds = useSelector((state: RootState) => selectBlogIds(state));
  const navigate = useNavigate();

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

      {blogIds.length === 0 ? (
        <p>No blogs yet...</p>
      ) : (
        blogIds.map((id) => <BlogItem key={id} id={id} />)
      )}
    </section>
  );
};

export default BlogList;
