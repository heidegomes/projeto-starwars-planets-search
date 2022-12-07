import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filtro() {
  const { setFilterName, filterName } = useContext(StarWarsContext);
  const { selected, setSelected } = useContext(StarWarsContext);
  const { selectedFilters, setSelectedFilters } = useContext(StarWarsContext);
  const { options } = useContext(StarWarsContext);
  const { order, setOrder } = useContext(StarWarsContext);

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
            {options.map((e) => <option value={ e } name={ e } key={ e }>{ e }</option>)}
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
            <option value="maior que" name="maior que">maior que</option>
            <option value="menor que" name="menor que">menor que</option>
            <option value="igual a" name="igual a">igual a</option>
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
          name="Filtrar"
          onClick={ () => {
            setSelectedFilters((prevState) => ([
              ...prevState,
              selected,
            ]));
            setSelected({
              column: options[0],
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
            data-testid="column-sort"
            name="ordenar"
            value={ order.column }
            onChange={ ({ target }) => setOrder({ ...order, column: target.value }) }
          >
            {options.map((e) => <option value={ e } name={ e } key={ e }>{ e }</option>)}
          </select>
        </label>

        <label htmlFor="Ascendente">
          Ascendente
          <input
            type="radio"
            data-testid="column-sort-input-asc"
            name="ASC"
            value="ASC"
            checked={ order.sort === 'ASC' }
            onChange={ ({ target }) => setOrder({ ...order, sort: target.value }) }
          />
        </label>

        <label htmlFor="Descendente">
          Descendente
          <input
            type="radio"
            data-testid="column-sort-input-desc"
            name="DESC"
            value="DESC"
            checked={ order.sort === 'DESC' }
            onChange={ ({ target }) => setOrder({ ...order, sort: target.value }) }
          />
        </label>

        <button
          type="button"
          name="Ordenar"
          data-testid="column-sort-button"
          onClick={ () => setOrder({ ...order }) }
        >
          Ordenar
        </button>

        <button
          data-testid="button-remove-filters"
          type="button"
          name="Remover Filtros"
          onClick={ () => {
            setSelectedFilters([]);
            setSelected({
              colum: '',
              condition: '',
              value: '',
            });
          } }
        >
          Remover Filtros
        </button>
      </form>

      <div>
        {selectedFilters.map((filter, index) => (
          <div data-testid="filter" key={ index }>
            <button
              type="button"
              name="x"
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
