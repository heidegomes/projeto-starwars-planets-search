import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import requestAPIFetch from '../services/requestAPI';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]); // retorno da API
  const [dataFilterName, setDataFilterName] = useState([]); // cópia do retorno da API

  useEffect(() => {
    requestAPIFetch().then((result) => {
      setDataFilterName(result);
      setData(result);
    });
  }, []);

  // filtro pelo nome
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    const result = dataFilterName
      .filter((e) => (e.name.toLowerCase().includes(filterName.toLowerCase())));
    setData(result);
  }, [filterName]);

  // filtro para unir inputs
  const [selected, setSelected] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    const result = dataFilterName
      .filter((e) => (e.name.toLowerCase().includes(filterName.toLowerCase())));

    const filteredNameNConditions = result.filter((linha) => {
      const filterResults = selectedFilters.map(({ column, comparison, value }) => {
        switch (comparison) {
        case 'maior que':
          return Number(linha[column]) > Number(value);
        case 'menor que':
          return Number(linha[column]) < Number(value);
        case 'igual a':
          return Number(linha[column]) === Number(value);
        default:
          return true;
        }
      });
      return filterResults.every((el) => el);
    });
    setData(filteredNameNConditions);
  }, [selectedFilters]);

  // Atualiza opções de filtro conforme são usados
  const [options, setOptions] = useState(['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);

  useEffect(() => {
    const arrColumnOptions = selectedFilters.map((e) => e.column);
    const arrOptions = ['population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water'];
    const filtraOpcoes = arrOptions.filter((e) => !arrColumnOptions.includes(e));
    setOptions(filtraOpcoes);
  }, [selectedFilters]);

  // Use Memo
  const value = useMemo(() => ({
    data,
    filterName,
    setFilterName,
    selected,
    setSelected,
    selectedFilters,
    setSelectedFilters,
    options,
    setOptions,
  }), [
    data,
    filterName,
    setFilterName,
    selected,
    setSelected,
    selectedFilters,
    setSelectedFilters,
    options,
    setOptions,
  ]);

  return (
    <StarWarsContext.Provider value={ value }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
