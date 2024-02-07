import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AppointmentList from './routes/getAppointment';
import Dia from './routes/day';

const router = createBrowserRouter([
  {
    path: "/data/:id",
    element: <AppointmentList />,
  },
  {
    path: "/dia/:data",
    element: <Dia/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
