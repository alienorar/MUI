import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from '../App.jsx';
import { SignIn, AdminLayout, SignUp, Category, Brands, SubCategories } from '@pages';


const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<SignUp />} />

        <Route path="admin-layout" element={<AdminLayout />}>
          <Route index element={<Category />} />
          <Route path="categories/:id" element={<SubCategories />} />
          <Route path="brands" element={<Brands />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default Index;
