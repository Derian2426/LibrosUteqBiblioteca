import { useState } from "react";
import { Button, Form, Navbar } from "react-bootstrap";
import "./App.css";
import {Tabladatos} from './componentes/datos'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Biblioteca
        </a>
        <Form
          className="form-inline my-2 my-lg-0"
          onSubmit={(e) => {
            e.defaultPrevented();
          }}
        >
          <Form.Control
            className="form-control mr-sm-5"
            type="search"
            placeholder="Search"
            aria-label="Search"
            maxLength={12}
          />
          <Button
            className="btn my-12 my-sm-0"
            type="button"
            onClick={() => {
              alert("Hola Mundo");
            }}
          >
            Search
          </Button>
        </Form>
      </Navbar>
      <Tabladatos/>
    </>
  );
}

export default App;
