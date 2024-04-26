import './App.css'
import { EventList } from './components/EventList';
import { Layout } from './components/Layout';
import { Login } from './components/forms/Login';
import { Register } from './components/forms/Register'
import {
  createBrowserRouter,
  Link,
  RouterProvider,
} from "react-router-dom";
import { TicketContext } from './context/tickets';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <EventList />
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
      <TicketContext>
        <RouterProvider router={router} />
      </TicketContext>
    </>
  )
}

export default App
