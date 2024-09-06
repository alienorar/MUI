import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from '../App.jsx';
import { SignIn, AdminLayout, StudentLayout } from '@pages';
import { TeachersList, StudentsList } from '@admin-rights';

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />

        <Route path="/admin-layout" element={<AdminLayout />}>
          <Route path="teachers-list" element={<TeachersList />} />  {/* Unique path */}
          <Route path="students-list" element={<StudentsList />} />  {/* Unique path */}
        </Route>

        <Route path="/student-layout" element={<StudentLayout />}>
          {/* Add child routes for students if needed */}
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default Index;
