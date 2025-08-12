import { useSelector } from "react-redux";
import { selectUserById } from "../reducers/userSlice";

const ShowAuthor = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));
   const usersList = useSelector((state) => state.users); 

 console.log("Found user:", user);

  return (
    <span style={{ marginLeft: "20px" }}>
      by {user?.name || "unknown"}
    </span>
  );
};

export default ShowAuthor;
