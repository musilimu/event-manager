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
import { Booking } from './components/Booking';
import { Dashboard } from './components/Dashboard';
import { CheckAuth, RequireAuth } from './components/RequireAuth';
import { ROLES } from 'schema';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <CheckAuth role={[ROLES.ADMIN, ROLES.GUEST]}>
          <EventList />
        </CheckAuth>

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
    path: "bookings",
    element: <Layout>
      <CheckAuth role={[ROLES.ADMIN, ROLES.GUEST]}>
        <Booking />
      </CheckAuth>
    </Layout>,
  },
  {
    path: "dashboard",
    element: <Layout>
      <RequireAuth role={[ROLES.ADMIN]}>

        <CheckAuth role={[ROLES.ADMIN]}>
          <Dashboard />
        </CheckAuth>
      </RequireAuth>
    </Layout>,
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
