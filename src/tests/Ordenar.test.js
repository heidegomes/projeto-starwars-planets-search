import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import StarWarsProvider from '../context/StarWarsProvider';
import data from '../data';

afterEach(() => jest.clearAllMocks());
beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(data),
  }));
})

describe('Testa as opções para ordenar', () => {
  test('Testa se ordena por ordem crescente e decrescente de população', async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
    
    const selectOrder = await screen.findByTestId('column-sort');
    const inputAscendente = screen.getByTestId('column-sort-input-asc');
    const inputDescendente = screen.getByTestId('column-sort-input-desc');
    const buttonOrdenar = screen.getByTestId('column-sort-button');
    
    userEvent.selectOptions(selectOrder, 'population');
    userEvent.click(inputAscendente);
    userEvent.click(buttonOrdenar);
    const planets = await screen.findAllByTestId('planet-name');
    expect(planets[0]).toHaveTextContent('Tatooine');

    userEvent.selectOptions(selectOrder, 'population');
    userEvent.click(inputDescendente);
    userEvent.click(buttonOrdenar);
    const planets2 = await screen.findAllByTestId('planet-name');
    expect(planets2[0]).toHaveTextContent('Cooruscant');
    });
  })