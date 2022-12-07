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
  test('Testa se ordena por ordem crescente de diametro', async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );

    const selectOrder = screen.getByTestId(/column-sort/i);
    // userEvent.click(inputOrdenar);

    
    // const diameterOrdenar = screen.getByRole('listbox',['diameter']);
    userEvent.selectOptions(selectOrder, '/diameter/i');
    u

    const inputAscendente = screen.getByTestId('column-sort-input-asc');
    userEvent.click(inputAscendente);

    const buttonOrdenar = screen.getByRole('button', { name: 'Ordenar' });
    userEvent.click(buttonOrdenar);

    expect().toBeInTheDocument();
    

})