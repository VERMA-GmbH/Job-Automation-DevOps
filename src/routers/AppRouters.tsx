import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import AddNewContact from "../pages/AddNewContact";
import EditContact from "../pages/EditContact";

export default function AppRouters() {
  const Element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/add-new-contact",
      element: <AddNewContact />,
    },
    {
      path: "/edit-contact/:id",
      element: <EditContact />,
    },
  ]);
  return Element;
}
