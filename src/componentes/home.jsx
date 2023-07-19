import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div>
      <h1>Bienvenido a mi aplicación</h1>
      <p>Esta es la página de inicio</p>
      <Link to="/contacto">Contacto</Link>
    </div>
  );
}

export function ContactPage() {
  return (
    <div>
      <h1>Contacto</h1>
      <p>Puedes contactarnos en el siguiente correo electrónico:</p>
      <p>contacto@miaplicacion.com</p>
      <Link to="/">Volver a la página de inicio</Link>
    </div>
  );
}