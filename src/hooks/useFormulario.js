import React from "react";
import { useState } from "react";

export const useFormulario = (initialState) => {
  const [inputs, setInputs] = useState(initialState);
  /**
   * Esta funcion se va a ejecutar por cada uno de los campos que se tengan
   * en el formulario, asi que el destructuring sera para cada una de las
   * propiedades de dichos campos
   * @param {*} e evento que se dispara en el formulario
   */
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    //old, hace referencia a los datos que ya tenia el todo, 'name' es la propiedad
    //pasada de forma dinamica por cada campo, si ya existe, actualiza el valor
    setInputs((old) => ({
      ...old,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const reset = () => {
    setInputs(initialState);
  };

  return [inputs, handleChange, reset];
};
