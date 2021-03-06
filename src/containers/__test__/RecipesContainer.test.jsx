import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { render } from '@testing-library/react';

import allConditionsState from '../../../fixtures/allConditionsState';
import RecipesContainer from '../RecipesContainer';

jest.mock('react-redux');
jest.mock('../../services/recipes');

describe('RecipesContainer', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      ...allConditionsState,
    }));
  });

  it('renders container', () => {
    render((
      <MemoryRouter>
        <RecipesContainer />
      </MemoryRouter>
    ));
  });
});
