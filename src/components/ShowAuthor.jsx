import { useSelector } from "react-redux";
import { selectUserById } from "../reducers/userSlice";

const ShowAuthor = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));

  if (!user) {
    return <span>Unknown author</span>;
  }

  return <span>by {user.name}</span>;
};

export default ShowAuthor;

