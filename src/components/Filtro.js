import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import styles from './Filtro.module.css';
import starWarsLogo from '../images/starWarsLogo.png';

function Filtro() {
  console.log(styles);
  const { setFilterName, filterName } = useContext(StarWarsContext);
  const { selected, setSelected } = useContext(StarWarsContext);
  const { selectedFilters, setSelectedFilters } = useContext(StarWarsContext);
  const { options } = useContext(StarWarsContext);
  const { order, setOrder } = useContext(StarWarsContext);

  return (
    <div className={ styles.filtro__container }>
      <div className={ styles.starWars__container }>
        <img src={ starWarsLogo } alt="starWars" className={ styles.starWars } />
      </div>
      <form>
        <div className={ styles.searchName }>
          <div className={ styles.searchName__container }>
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
          </div>
        </div>

        <div className={ styles.filtros_container }>
          <div className={ styles.options }>
            <label htmlFor="column">
              Coluna
              <select
                className={ styles.selected }
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
          </div>

          <div className={ styles.options }>
            <label htmlFor="comparison-filter">
              Operador
              <select
                className={ styles.selected }
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
          </div>
          <div className={ styles.options_input }>
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
          </div>

          <div className={ styles.options_button }>
            <button
              className={ styles.button }
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
              FILTRAR
            </button>
          </div>

          <div className={ styles.options }>
            <label htmlFor="Ordenar">
              Ordenar
              <select
                className={ styles.selected }
                data-testid="column-sort"
                name="ordenar"
                value={ order.column }
                onChange={ ({ target }) => setOrder({ ...order, column: target.value }) }
              >
                {options.map((e) => <option value={ e } name={ e } key={ e }>{ e }</option>)}
              </select>
            </label>
          </div>

          <div className={ styles.options_radio }>
            <label htmlFor="Ascendente">
              <input
                type="radio"
                data-testid="column-sort-input-asc"
                name="ASC"
                value="ASC"
                checked={ order.sort === 'ASC' }
                onChange={ ({ target }) => setOrder({ ...order, sort: target.value }) }
              />
              Ascendente
            </label>

            <label htmlFor="Descendente">
              <input
                type="radio"
                data-testid="column-sort-input-desc"
                name="DESC"
                value="DESC"
                checked={ order.sort === 'DESC' }
                onChange={ ({ target }) => setOrder({ ...order, sort: target.value }) }
              />
              Descendente
            </label>
          </div>

          <div className={ styles.options_button }>
            <button
              className={ styles.button }
              type="button"
              name="Ordenar"
              data-testid="column-sort-button"
              onClick={ () => setOrder({ ...order }) }
            >
              ORDENAR
            </button>
          </div>

          <div className={ styles.options_button }>
            <button
              className={ styles.button }
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
              REMOVER FILTROS
            </button>
          </div>
        </div>
      </form>

      <div className={ styles.filtro_selected_container }>
        {selectedFilters.map((filter, index) => (
          <div data-testid="filter" key={ index } className={ styles.filtro_selected }>
            <button
              className={ styles.button_x }
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
            <span className={ styles.filtro_selected_span }>
              {filter.column} {filter.comparison} {filter.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filtro;
