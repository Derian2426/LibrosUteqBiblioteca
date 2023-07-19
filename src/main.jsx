import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Contact from "./routes/registroLibro";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FormularioLibro from "./routes/registroLibro";
import Botonera from "./routes/botones";
import FileUpload from "./routes/audios";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "contacts",
    element: <FormularioLibro/>,
  },
  ,
  {
    path: "amor/:contactId",
    element: <App />,
  },
  {
    path: "botones",
    element: <Botonera/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
