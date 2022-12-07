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

// Filtros
describe('Testa as opções de filtros selecionados', () => {
  test('Testa se existe um filtro por nome', async () => { 
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
    const inputName = screen.getByTestId(/name-filter/i);
    expect(inputName).toBeInTheDocument();
    userEvent.type(inputName, 'Bes');

    const planet = await screen.findByRole('cell', { name:/Bespin/i });
    expect(planet).toBeInTheDocument();
  })

})
