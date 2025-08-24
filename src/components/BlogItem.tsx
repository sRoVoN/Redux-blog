import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectBlogById } from "../reducers/blogSlice";
import ReactionButtons from "./ReactionButtons";
import ShowAuthor from "./ShowAuthor";
import ShowTime from "./ShowTime";
import type { RootState } from "../types";

interface BlogItemProps {
  id: string;
}

const BlogItemComponent: React.FC<BlogItemProps> = ({ id }) => {
  const blog = useSelector((state: RootState) => selectBlogById(state, id));

  if (!blog) return null;

  return (
    <article className="blog-excerpt">
      <h3>🗒 {blog.title}</h3>

      <p className="blog-content">
        {blog.body ? `${blog.body.slice(0, 100)}...` : "No content available."}
      </p>

      <div className="blog-actions">
        <ReactionButtons blogId={blog.id} />
        <Link to={`/blogs/${blog.id}`} className="button muted-button">
          more...
        </Link>
      </div>

      <div className="blog-meta">
        <ShowAuthor userId={blog.userId} />
        <ShowTime timestamp={blog.date} />
      </div>
    </article>
  );
};

export default React.memo(BlogItemComponent);
