import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filtro() {
  const { setFilterName, filterName } = useContext(StarWarsContext);
  const { selected, setSelected } = useContext(StarWarsContext);
  const { selectedFilters, setSelectedFilters } = useContext(StarWarsContext);

  // const handleChange = ({ target }) => {
  //   setSelectedFilters({ ...inputs, [target.name]: target.value });
  // };

  return (
    <div>
      <form>
        <label htmlFor="name-filter">
          Projeto Star Wars - Trybe
          <input
            data-testid="name-filter"
            placeholder="Digite o nome do planeta"
            type="text"
            name="name-filter"
            value={ filterName }
            onChange={ (event) => setFilterName(event.target.value) }
          />
        </label>

        <label htmlFor="column">
          Coluna
          <select
            data-testid="column-filter"
            name="column"
            value={ selected.column }
            // onChange={ (event) => setSelectedFilters(event.target.value) }
            onChange={ ({ target }) => setSelected((prevSelect) => ({
              ...prevSelect,
              column: target.value,
            })) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>

        <label htmlFor="comparison-filter">
          Operador
          <select
            data-testid="comparison-filter"
            name="comparison"
            value={ selected.comparison }
            onChange={ ({ target }) => setSelected((prevSelect) => ({
              ...prevSelect,
              comparison: target.value,
            })) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <input
          data-testid="value-filter"
          name="value"
          type="number"
          value={ selected.value }
          onChange={ ({ target }) => setSelected((prevSelect) => ({
            ...prevSelect,
            value: target.value,
          })) }
        />

        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => {
            setSelectedFilters((prevState) => ([
              ...prevState,
              selected,
            ]));
            setSelected({
              column: 'population',
              comparison: 'maior que',
              value: 0,
            });
          } }
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

        <button
          data-testid="button-remove-filters"
          type="button"
        // onClick={ handleChange }
        >
          Remover Filtros
        </button>
      </form>

      <div>
        {selectedFilters.map((filter, index) => (
          <div data-testid="filter" key={ index }>
            <button
              data-testid="filter"
              type="button"
              onClick={ () => {
                const cloneArray = [...selectedFilters];
                cloneArray.splice(index, 1);
                setSelectedFilters(cloneArray);
              } }
            >
              x
            </button>
            <span>
              {filter.column}
              {filter.comparison}
              {filter.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filtro;
