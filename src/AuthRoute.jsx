import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { postData } from "./peticionesHttp";
import config from "./configuracion";

const validateToken = async (token, userLogger) => {
  try {
    const Url = config.libroUrl;
    const response = await postData(Url + "/login/validate", {
      token,
      userLogger,
    });
    return response.valorEstado > 0;
  } catch (error) {
    console.error("Error al validar el token:", error);
    return false;
  }
};

export const AuthRoute = ({ component: Component }) => {
  const [isTokenValidation, setIsTokenValidation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("loggerUser");

    const checkTokenValidation = async () => {
      if (isAuthenticated) {
        const loggerUserObject = JSON.parse(isAuthenticated);
        const { token, userLogger } = loggerUserObject;
        try {
          const isValid = await validateToken(token, userLogger);
          setIsTokenValidation(isValid);
        } catch (error) {
          setIsTokenValidation(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    checkTokenValidation();
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isTokenValidation) {
    return <Component />;
  } else {
    if (isTokenValidation === false) {
      localStorage.removeItem("loggerUser");
    }
    return <Navigate to="/" />;
  }
};
