import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reactionAdded, selectBlogById } from "../reducers/blogSlice";
import type { RootState, AppDispatch } from "../types";

interface ReactionButtonsProps {
  blogId: string;
}

const reactionEmoji: Record<string, string> = {
  thumbsUp: "👍",
  heart: "❤️",
  thumbsDown: "👎",
  laughing: "😂",
  raisedEyebrow: "🤨",
  sad: "😢",
};

const ReactionButtons: React.FC<ReactionButtonsProps> = ({ blogId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const blog = useSelector((state: RootState) => selectBlogById(state, blogId));

  if (!blog) return null;

  return (
    <div className="reaction-buttons">
  {(
    Object.keys(blog.reactions) as (keyof typeof blog.reactions)[]
  ).map((name) => (
    <button
    style={{marginRight: "5px"}}
       key={name.toString()}
      onClick={() =>
        dispatch(reactionAdded({ blogId, reaction: name }))
      }
    >
      {reactionEmoji[name.toString()]} {blog.reactions[name]}
    </button>
  ))}
</div>
  );
};

export default ReactionButtons;
