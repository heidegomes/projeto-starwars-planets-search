import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import requestAPIFetch from '../services/requestAPI';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [dataFilterName, setDataFilterName] = useState([]);

  useEffect(() => {
    requestAPIFetch().then((result) => {
      setDataFilterName(result);
      setData(result);
    });
  }, []);

  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    const result = dataFilterName
      .filter((e) => (e.name.toLowerCase().includes(filterName.toLowerCase())));
    setData(result);
  }, [filterName]);

  const value = useMemo(() => ({
    data,
    filterName,
    setFilterName,
  }), [data, setFilterName, filterName]);

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
