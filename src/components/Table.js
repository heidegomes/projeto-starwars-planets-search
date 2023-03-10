import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import styles from './Table.module.css';

function Table() {
  const { data } = useContext(StarWarsContext);
  return (
    <div className={ styles.table__container }>
      <table className={ styles.table }>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((e) => (
              <tr key={ e.name }>
                <td
                  data-testid="planet-name"
                >
                  { e.name }

                </td>
                <td>{ e.rotation_period }</td>
                <td>{ e.orbital_period }</td>
                <td>{ e.diameter }</td>
                <td>{ e.climate }</td>
                <td>{ e.gravity }</td>
                <td>{ e.terrain }</td>
                <td>{ e.surface_water }</td>
                <td>{ e.population }</td>
                <td>{ e.films }</td>
                <td>{ e.created }</td>
                <td>{ e.edited }</td>
                <td>{ e.url }</td>
              </tr>
            ))
          }
        </tbody>
      </table>

    </div>
  );
}

export default Table;
