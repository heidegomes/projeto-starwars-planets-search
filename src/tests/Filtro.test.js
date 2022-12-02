import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers';
import planets from '../data';

const features = [
  { name: "population" },
  { name: "orbital_period" },
  { name: "diameter" },
  { name: "rotation_period" },
  { name: "surface_water" },
]

// Filtrar
describe('Testa as opções para filtrar', () => {
  test('Testa se a página contem um input para o nome do planeta, para selecioanr a coluna, para selecionar a condição e adicionar o valor', () => {
    render(<App />);
    const inputPlanetName = screen.getByTestId("name-filter");
    expect(inputPlanetName).toBeInTheDocument();
  
    const inputSelectColumn = screen.getByTestId("column-filter");
    expect(inputSelectColumn).toBeInTheDocument();
  
    const inputSelectComparison = screen.getByTestId("comparison-filter");
    expect(inputSelectComparison).toBeInTheDocument();
  
    const inputAddValue = screen.getByTestId("value-filter");
    expect(inputAddValue).toBeInTheDocument();
  });
  
  test('Testa se a página contem um botão para filtrar', () => {
    render(<App />);
    const buttonFiltrar = screen.getByRole('button', { name: 'Filtrar' });
    expect(buttonFiltrar).toBeInTheDocument();
  });
  
  
  test('Testa se o filtro de coluna possui 5 opções para serem selecionadas ', () => {
    render(<App />);
    const inputSelectColumn = screen.getByTestId("column-filter");
    const options = screen.getByRole('option', features);
    userEvent.selectOptions(inputSelectColumn, options);
    expect(options.lenght).toBe(5);
  
  });
  
  test('Testa se o filtro de coluna permite mudar de opção', () => { 
    render(<App />);
    const inputSelectColumn = screen.getByTestId("column-filter");
    const optionOrbitalPeriod = screen.getByRole('option', { name: 'orbital_period'});
    userEvent.selectOptions(inputSelectColumn, optionOrbitalPeriod);
    expect(optionOrbitalPeriod.selected).toBeTruthy();
  });
})

// Ordenar
describe('Testa as opções para ordenar', () => {
  test('Testa se a página contem um input para ordenar por coluna, por ordem crescente e decrescente.', () => {
    render(<App />);
    const inputOrdenar = screen.getByTestId("column-sort");
    expect(inputOrdenar).toBeInTheDocument();
  
    const inputAscendente = screen.getByRole('radio', { name: ascendente });
    expect(inputAscendente).toBeInTheDocument();
  
    const inputDescendente = screen.getByRole('radio', { name: descendente });
    expect(inputDescendente).toBeInTheDocument();
  });
  
  test('Testa se a página contem um botão para ordenar', () => {
    render(<App />);
    const buttonOrdenar = screen.getByRole('button', { name: 'Ordenar' });
    expect(buttonOrdenar).toBeInTheDocument();
  });
  
  test('Testa se o filtro de Ordenar possui 5 opções para serem selecionadas ', () => {
    render(<App />);
    const inputSelectOrdenar = screen.getByTestId("column-sort");
    const options = screen.getByRole('option', features);
    userEvent.selectOptions(inputSelectOrdenar, options)
    expect(options.lenght).toBe(5);
  
  });
  
  test('Testa se o filtro de Ordenar permite mudar de opção', () => {
    render(<App />);
    const inputSelectOrdenar = screen.getByTestId("column-sort");
    const optionOrbitalPeriod = screen.getByRole('option', { name: 'orbital_period' });
    userEvent.selectOptions(inputSelectOrdenar, optionOrbitalPeriod);
    expect(inputSelectOrdenar.selected).toBeTruthy();
  });
})

// Filtros
describe('Testa as opções de filtros selecionados', () => {
  test('Testa se o conjunto de filtros selecionados aparece na tela após clicar no botão `Filtrar`', async () => { 
    render(<App />);
    
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
  test('Testa se o botão `x` aparece ao lado do filtro selecionado', async () => {
    render(<App />);

    const inputSelectColumn = screen.getByTestId("column-filter");
    const optionOrbitalPeriod = screen.getByRole('option', { name: 'orbital_period' });
    userEvent.selectOptions(inputSelectColumn, optionOrbitalPeriod)

    const inputSelectComparison = screen.getByTestId("comparison-filter");
    const optionMaiorQue = screen.getByRole('option', { name: 'maior que' });
    userEvent.selectOptions(inputSelectComparison, optionMaiorQue);

    const inputAddValue = screen.getByTestId("value-filter");
    userEvent.type(inputAddValue, '0')

    const buttonFiltrar = screen.getByRole('button', { name: 'Filtrar' });
    userEvent.click(buttonFiltrar);

    const buttonX = screen.getByRole('button', { name: 'x' });

    await waitFor(() => {
      expect(getByText(buttonX)).toBeInTheDocument();
    })
    
  })
  test('Testa se o filtro é removido quando clicar no `x`', async () => {
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
  test('Testa se a página contem um botão para `Remover Filtros`', () => {
    render(<App />);
    const buttonRemoverFiltros = screen.getByRole('button', { name: 'Remover Filtros' });
    expect(buttonRemoverFiltros).toBeInTheDocument();
  })
  // test('Testa se todos os filtros são removidos quando clicar no botão `Remover Filtros`', () => {
  // })
})
