import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, {
  setRecipes,
  loadRecipes,
} from '../recipes';
import sampleRecipes from '../../../fixtures/recipes';

jest.mock('../../services/recipes');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('recipes reducer', () => {
  const initialState = {
    recipesBook: [],
  };

  context('when previous state is undefined', () => {
    it('return initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setRecipes', () => {
    it('update recipes', () => {
      const state = reducer(initialState, setRecipes(sampleRecipes));

      expect(state).toEqual({ recipesBook: [...sampleRecipes] });
    });
  });
});

describe('recipes actions', () => {
  describe('loadRecipes', () => {
    it('runs setRecipes', async () => {
      const store = mockStore({});

      await store.dispatch(loadRecipes([]));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setRecipes([]));
    });
  });
});
