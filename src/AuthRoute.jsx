import React, { useState, useEffect, useContext } from "react";
import { postData } from "./peticionesHttp";
import config from "./configuracion";
import { AccesibilidadContext } from "./context/AccesibilidadContext";

const validateToken = async (token, userLogger) => {
  try {
    const Url = config.libroUrl;
    const response = await postData(Url + "/login/validate", {
      token,
      userLogger,
    });
    return response.valorEstado > 0;
  } catch (error) {
    return false;
  }
};

export const AuthRoute = ({ component: Component }) => {
  const { setSesionExitosa } = useContext(AccesibilidadContext);
  const [isTokenValidation, setIsTokenValidation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = localStorage.getItem("loggerUser");

  useEffect(() => {
    const checkTokenValidation = async () => {
      const loggerUserObject = JSON.parse(isAuthenticated);
      const { token, userLogger } = loggerUserObject;
      try {
        const isValid = await validateToken(token, userLogger);
        setIsTokenValidation(isValid);
        if (isValid) {
          setSesionExitosa(true);
        } else {
          localStorage.removeItem("loggerUser");
          setSesionExitosa(false);
        }
      } catch (error) {
        setIsTokenValidation(false);
        setSesionExitosa(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated === null) {
      setIsTokenValidation(false);
      setIsLoading(false);
      setSesionExitosa(false);
    } else {
      checkTokenValidation();
    }
  }, [isAuthenticated, setSesionExitosa]);

  if (isLoading) {
    return <div>Cargando</div>;
  }

  if (isTokenValidation) {
    return <Component />;
  } else {
    window.location.href = "/";
    setSesionExitosa(false);
  }
};
