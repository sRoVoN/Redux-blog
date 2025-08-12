import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../layouts/MainLayout.jsx';
import App from '../App.jsx';
import SingleBlogPage from "../components/SingleBlogPage.jsx";
import CreateBlogForm from "../components/CreateBlogForm.jsx";
import EditBlogForm from "../components/EditBlogForm.jsx";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: (
      <h3 className='text-center'>found nothing! 🧐</h3>
    ),
      children: [
        {
          path: "/",
          element: <App />,
        },
        {
          path: "/blogs/created-blog",
          element: <CreateBlogForm />
        },
        {
          path: "/blogs/:blogId",
          element: <SingleBlogPage />
        },
        {
          path: "/editBlog/:blogId",
          element: <EditBlogForm />
        },
      ],
    },
  ]);