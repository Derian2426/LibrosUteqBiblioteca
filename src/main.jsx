import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import { createHashRouter, RouterProvider } from "react-router-dom";
import FormularioLibro from "./routes/registroLibro";
import Principal from "./routes/Navbar";
import BusquedaLibros from "./routes/busquedaLibros";
import IniciarSesion from "./routes/iniciarsesion";
import AudioLibro from "./routes/audioLibro";
import { AuthRoute } from "./AuthRoute";
import { NotAuthRoute } from "./NotAuthRoute";
import { AccesibilidadContextProvider } from "./context/AccesibilidadContext";

const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/registrarlibros",
    element: <AuthRoute component={FormularioLibro} />,
  },
  {
    path: "/IniciarSesion",
    element: <NotAuthRoute component={IniciarSesion} />,
  },
  {
    path: "/BuscarLibros",
    element: <BusquedaLibros />,
  },
  {
    path: "/audiolibro/:data",
    element: <AudioLibro />,
  },
];

const router = createHashRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AccesibilidadContextProvider>
      <Principal />
      <RouterProvider router={router}></RouterProvider>
    </AccesibilidadContextProvider>
  </React.StrictMode>
);
