import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from '../App.jsx';
import { SignIn, AdminLayout, StudentLayout, SignUp, Category } from '@pages';
import { StudentsList, TeachersList } from '@admin-rights';
import { Groups, Rating, Tasks } from '@student-rights'

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<SignUp />} />

        <Route path="category" element={<Category />}>
        </Route>

        <Route path="admin-layout" element={<AdminLayout />}>
          <Route index element={<TeachersList />} />
          <Route path="students-list" element={<StudentsList />} />
        </Route>

        <Route path="student-layout" element={<StudentLayout />}>
          <Route index element={<Groups />} />
          <Route path="rating" element={<Rating />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default Index;
