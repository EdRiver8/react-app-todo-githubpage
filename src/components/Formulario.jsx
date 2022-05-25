import React from "react";
import { useState } from "react";
import Swal from "sweetalert2"; //npm install sweetalert2
import { v4 as uuidv4 } from "uuid"; //npm i uuid
import { useFormulario } from "../hooks/useFormulario";

const Formulario = ({ agregarTodo }) => {
  const initialState = {
    nombre: "",
    descripcion: "",
    estado: "pendiente",
    prioridad: false,
  };

  //const [todo, setTodo] = useState(initialState);
  const [inputs, handleChange, reset] = useFormulario(initialState);

  const { nombre, descripcion, estado, prioridad } = inputs;

  /**
   * al dar click en submit, envia un array con los campos del formulario en este
   * @param {*} e evento que envia todos los campos del formulario
   * @returns
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      //console.log("No deje el campo vacio!");
      e.target[0].focus();
      Swal.fire({
        title: "Error!",
        text: "Llene el campo nombre",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    if (!descripcion.trim()) {
      e.target[0].focus();
      e.target[1].focus();
      Swal.fire({
        title: "Error!",
        text: "Llene el campo descripcion",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    Swal.fire({
      title: "Datos Enviados!",
      text: "Tarea Salvada",
      icon: "success",
      confirmButtonText: "Ok",
    });
    //console.log(todo);
    agregarTodo({
      nombre: nombre,
      descripcion: descripcion,
      estado: estado === "pendiente" ? false : true,
      prioridad: prioridad,
      id: uuidv4(), //forma de generar un id diferente
    });
    reset();
  };

  return (
    <>
      <h3>Agregar Todo</h3>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          name="nombre"
          placeholder="Titulo Tarea"
          value={nombre}
          onChange={handleChange}
        />
        <textarea
          placeholder="Describa la tarea a realizar"
          className="form-control mb-2"
          name="descripcion"
          cols="30"
          rows="3"
          value={descripcion}
          onChange={handleChange}
        />
        <select
          name="estado"
          className="form-control mb-2"
          value={estado}
          onChange={handleChange}
        >
          <option value="pendiente">Pendiente</option>
          <option value="completado">Completado</option>
        </select>
        <div className="form-check">
          <input
            id="flexCheckDefault"
            type="checkbox"
            className="form-check-input"
            name="prioridad"
            checked={prioridad}
            onChange={handleChange}
          />
          <label htmlFor="flexCheckDefault" className="form-check-label">
            Prioritario
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Agregar
        </button>
      </form>
    </>
  );
};

export default Formulario;
