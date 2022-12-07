import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import planets from '../data';
import data from '../data';
import { act } from 'react-dom/test-utils';
import StarWarsProvider from '../context/StarWarsProvider';

afterEach(() => jest.clearAllMocks());
beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(data),
  }));
})

describe('Testa as opções para retonar resultados na tabela', () => {
  test('Testa se ao abrir a página, a função requestAPIFetch da requestAPI é chamada.', async () => {
    render(<App />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('Testa se ao carregar a página, é feita a requisição para preencher a tabela.', async () => {
    render(<App />);
    const renderedTable = await screen.findByText('Tatooine');
    expect(renderedTable).toBeInTheDocument();
  });

  test('Testa se ao selecionar coluna, operador e valor a tabela é preenchida somente com os valores que obedecem as condições', async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );

    const planet = await screen.findByText(/Bespin/i);

    const inputSelectColumn = screen.getByTestId(/column-filter/i);

    expect(inputSelectColumn).toBeInTheDocument();

    userEvent.selectOptions(inputSelectColumn, "orbital_period");

    const inputSelectComparison = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(inputSelectComparison, "maior que");

    const inputAddValue = screen.getByTestId(/value-filter/i);
    userEvent.type(inputAddValue, '5000');

    const buttonFiltrar = screen.getByTestId(/button-filter/i);
    userEvent.click(buttonFiltrar);

    expect(planet.innerHTML).toBe('Bespin');
  });

  test('Testa se ao carregar a página, é renderizada uma tabela com a coluna Diameter', () => {
    render(<App />);
    const columnHeaderName = screen.getByText('Diameter');
    expect(columnHeaderName).toBeInTheDocument();
  });
});