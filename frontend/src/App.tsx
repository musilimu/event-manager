import './App.css'
import { Layout } from './components/Layout';
import { Login } from './components/forms/Login';
import { Register } from './components/forms/Register'
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <h1>Hello World</h1>
        <Link to="/login">Login</Link>
      </Layout>
    ),
  },
  {
    path: "login",
    element: <Layout><Login /></Layout>,
  },
  {
    path: "register",
    element: <Layout><Register /></Layout>,
  },
  {
    path: "*",
    element: (
      <Layout>
        <h1>Page not found</h1>
        <Link to="/">got to home</Link>
      </Layout>
    ),
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
