import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AppointmentList from './routes/getAppointment';
import Dia from './routes/day';
import Semana from './routes/week';
import Mes from './routes/month';
const router = createBrowserRouter([
  {
    path: "/data/:id",
    element: <AppointmentList />,
  },
  {
    path: "/dia/:data",
    element: <Dia/>,
  },
  {
    path: "/week/:data",
    element: <Semana/>,
  },
  {
    path: "/mes/:data",
    element: <Mes/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
