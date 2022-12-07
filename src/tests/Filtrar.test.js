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
  test('Testa se o conjunto de filtros selecionados aparece na tela após clicar no botão `Filtrar`', async () => { 
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
    
    const inputSelectColumn = screen.getByTestId("column-filter");
    const optionOrbitalPeriod = screen.getByRole('option', { name: 'orbital_period' });
    userEvent.selectOptions(inputSelectColumn, optionOrbitalPeriod )
    
    const inputSelectComparison = screen.getByTestId("comparison-filter");
    const optionMaiorQue = screen.getByRole('option', { name: 'maior que' });
    userEvent.selectOptions(inputSelectComparison, optionMaiorQue);

    const inputAddValue = screen.getByTestId("value-filter");
    userEvent.type(inputAddValue, '0')
    
    const buttonFiltrar = screen.getByRole('button', { name: 'Filtrar' });
    userEvent.click(buttonFiltrar);

    const filtroText = screen.getByText('populationmaior que0');

    await waitFor(() => {
      expect(getByText(filtroText)).toBeInTheDocument();
    })
  })
  test('Testa se o filtro é removido quando clicar no `x`', async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
    const inputSelectColumn = screen.getByTestId('column-filter');
    const optionOrbitalPeriod = screen.getByRole('option', { name: 'orbital_period' });
    userEvent.selectOptions(inputSelectColumn, optionOrbitalPeriod)

    const inputSelectComparison = screen.getByTestId("comparison-filter");
    const optionMaiorQue = screen.getByRole('option', { name: 'maior que' });
    userEvent.selectOptions(inputSelectComparison, optionMaiorQue);

    const inputAddValue = screen.getByTestId("value-filter");
    userEvent.type(inputAddValue, '0');

    const buttonFiltrar = screen.getByRole('button', { name: 'Filtrar' });
    userEvent.click(buttonFiltrar);

    const buttonX = screen.getByRole('button', { name: 'x' });
    userEvent.click(buttonX);

    const filtroText = screen.getByText('populationmaior que0');
    await waitForElementToBeRemoved(() => queryByText(filtroText));
  })

  test('Testa se os filtros são removidos ao clicar no botão para `Remover Filtros`', async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
    const buttonRemoverFiltros = screen.getByRole('button', { name: 'Remover Filtros' });
    userEvent.click(buttonRemoverFiltros)
    expect().toBeInTheDocument();
  })
})
