import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import planets from '../data';
import data from '../data';
import { act } from 'react-dom/test-utils';

const planetMaiorQue = planets[5];
afterEach(() => jest.clearAllMocks());

describe('Testa as opções para retonar resultados na tabela', () => {
  test('Testa se ao abrir a página, a função requestAPIFetch da requestAPI é chamada.', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(data),
    }));
    render(<App />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('Testa se ao carregar a página, é feita a requisição para preencher a tabela.', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(data),
    }));
    render(<App />);
    const renderedTable = await screen.findByText('Tatooine');
    expect(renderedTable).toBeInTheDocument();
    // expect(global.fetch).toBeInTheDocument();
  });

  test('Testa se ao selecionar coluna, operador e valor a tabela é preenchida somente com os valores que obedecem as condições', async () => {
    render(<App />);
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(data),
    }));

    act(() => {
      const inputSelectColumn = screen.getByTestId("column-filter");
      userEvent.selectOptions(inputSelectColumn, "orbital_period");

      const inputSelectComparison = screen.getByTestId("comparison-filter");
      userEvent.selectOptions(inputSelectComparison, "maior que");

      const inputAddValue = screen.getByTestId("value-filter");
      userEvent.type(inputAddValue, '5000');

      const buttonFiltrar = screen.getByRole('button', { name: 'Filtrar' });
      userEvent.click(buttonFiltrar);
    });

    expect(planetMaiorQue).toBeInTheDocument();
  });

  xtest('Testa se ao carregar a página, é renderizada uma tabela com as colunas: Name, Rotation Period, Orbital Period, Diameter, Climate, Gravity, Terrain, Surface Water, Population, Films, Created, Edited, URL', () => {
    render(<App />);
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(data),
    }));
    const columnHeader = [
      { name: 'Name' },
      { name: 'Rotation Period' },
      { name: 'Diameter' },
      { name: 'Climate' },
      { name: 'Gravity' },
      { name: 'Terrain' },
      { name: 'Surface Water' },
      { name: 'Population' },
      { name: 'Films' },
      { name: 'Created' },
      { name: 'Edited' },
      { name: 'URL' },
    ];

    render(<App />);
    const columnHeaderName = screen.getAllByRole("columnheader", columnHeader.name);
    expect(columnHeaderName).toBeInTheDocument();
  });
});