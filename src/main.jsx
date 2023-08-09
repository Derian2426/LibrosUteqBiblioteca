import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import FormularioLibro from "./routes/registroLibro";
import Principal from "./routes/Navbar";
import BusquedaLibros from "./routes/busquedaLibros";
import IniciarSesion from "./routes/iniciarsesion";
import AudioLibro from "./routes/audioLibro";
import Botonera from "./routes/botones";
import Footer from "./routes/footer";
const routes = [
{
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "registrarlibros",
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
  {
    path: "IniciarSesion",
    element: <IniciarSesion/>,
  },
  {
    path: "BuscarLibros",
    element: <BusquedaLibros/>,
  },
  {
    path: "MostrarAudioLibro/:data",
    element: <AudioLibro/>,
  },
  {
    path: "PantallaInicio/:data",
    element: <Principal/>,
  },
  {
    path: "Mostrarfooter/:data",
    element: <Footer/>,
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Principal/>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>
);
