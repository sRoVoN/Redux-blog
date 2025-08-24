// App.jsx
import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { fetchUsers } from "./reducers/userSlice";
import { fetchBlogs } from "./reducers/blogSlice"; 
import BlogsList from "./components/BlogsList";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <>
      <BlogsList />
    </>
  );
};

export default App;
