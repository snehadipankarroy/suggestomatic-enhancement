import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './actions'
import nock from 'nock'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import exampleResponse from '../test/action_PAD4_response.json';

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
    const testQueryText = 'PAD4';

    nock(/gramene.org/)
        .get(/suggest/)
        .reply(200, exampleResponse);

    const store = mockStore({});

    return store.dispatch(actions.fetchSuggestions(testQueryText))
                .then(() => { // return of async actions
                  expect(store.getActions()).toMatchSnapshot()
                })
  })
})
;
