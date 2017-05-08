import {combineReducers} from 'redux';

import {SUGGESTIONS_REQUEST, SUGGESTIONS_FAILURE, SUGGESTIONS_SUCCESS} from './actions';

// const exampleState = {
//   suggestText: 'PAD4',
//   suggestionsForText: {
//     PAD4: {
//       isFetching: false,
//       items: [
//
//       ]
//     }
//   }
// };

const suggestions = (state = { isFetching: false, categories: [] }, action) => {
  switch (action.type) {
    case SUGGESTIONS_REQUEST: {
      return Object.assign({}, state, {isFetching: true})
    }
    case SUGGESTIONS_SUCCESS: {
      return Object.assign({}, state, {isFetching: false, categories: action.response})
    }
    case SUGGESTIONS_FAILURE: {
      return Object.assign({}, state, {isFetching: false, categories: action.error})
    }
    default:
      return state;
  }
};

const suggestText = (state = '', action) => {
  switch(action.type) {
    case SUGGESTIONS_REQUEST: {
      return action.text
    }
    default: {
      return state;
    }
  }
};

const suggestionsForText = (state = {}, action) => {
  switch (action.type) {
    case SUGGESTIONS_SUCCESS:
    case SUGGESTIONS_FAILURE:
    case SUGGESTIONS_REQUEST: {
      return Object.assign({}, state, {
        [action.text]: suggestions(state[action.suggestText], action)
      })
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  suggestText,
  suggestionsForText
});

export default rootReducer;