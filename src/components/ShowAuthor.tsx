import React from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "../reducers/userSlice";
import type { RootState } from "../types";

interface ShowAuthorProps {
  userId: string | number;
}

const ShowAuthor: React.FC<ShowAuthorProps> = ({ userId }) => {
  const user = useSelector((state: RootState) =>
    selectUserById(state, String(userId))
  );

  return <span>By {user ? user.name : "Unknown author"}</span>;
};

export default ShowAuthor;
