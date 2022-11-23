import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filtro() {
  const { setFilterName, filterName } = useContext(StarWarsContext);

  // const handleChange = ({ target }) => {
  //   setInputs({ ...inputs, [target.name]: target.value }, () => filterByName);
  // };

  return (
    <div>
      <form>
        <label htmlFor="name">
          Projeto Star Wars - Trybe
          <input
            data-testid="name-filter"
            type="text"
            name="name"
            value={ filterName }
            onChange={ (event) => setFilterName(event.target.value) }
          />
        </label>

        <label htmlFor="Coluna">
          Coluna
          <select
            name="coluna"
            // value={ inputs.coluna }
            // onChange={ handleChange }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>

        <label htmlFor="Operador">
          Operador
          <select
            id="episode"
            name="quantity"
            // value={ inputs.quantity }
            // onChange={ handleChange }
          >
            <option value="menor que">menor que</option>
            <option value="maior que">maior que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <input
          name="value"
          type="number"
          // value={ inputs.value }
          // onChange={ handleChange }
        />

        <button
          type="button"
        // onClick={ handleChange }
        >
          Filtrar
        </button>

        <label htmlFor="Ordenar">
          Ordenar
          <select
            name="ordenar"
            // value={ inputs.ordenar }
            // onChange={ handleChange }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>

        <label htmlFor="Ascendente">
          Ascendente
          <input
            type="radio"
            name="ascendente"
            // value={ inputs.ascendente }
            // onChange={ handleChange }
            checked
          />
        </label>

        <label htmlFor="Descendente">
          Descendente
          <input
            type="radio"
            name="descendente"
            // value={ inputs.descendente }
            // onChange={ handleChange }
          />
        </label>

        <button
          type="button"
          // onClick={ handleChange }
        >
          Ordenar
        </button>

      </form>
    </div>
  );
}

export default Filtro;
