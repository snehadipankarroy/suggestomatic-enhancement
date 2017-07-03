import fetch from 'isomorphic-fetch'
import _ from 'lodash';

export const SUGGESTIONS_REQUEST = 'SUGGESTIONS_REQUEST';
export const SUGGESTIONS_FAILURE = 'SUGGESTIONS_FAILURE';
export const SUGGESTIONS_SUCCESS = 'SUGGESTIONS_SUCCESS';

export const SELECT_SUGGESTION = 'SELECT_SUGGESTION';
export const CLEAR_INPUT = 'CLEAR_INPUT';


export function selectSuggestion(text, response) {
  return { type: SELECT_SUGGESTION, text , response }
}

const clearInput = target => (
    {
      type: CLEAR_INPUT,
      target
    }
);

const suggestionsRequest = text => (
    {
      type: SUGGESTIONS_REQUEST,
      text
    }
);

const suggestionsFailure = (text, error) => (
    {
      type: SUGGESTIONS_FAILURE,
      error
    }
);

const suggestionsResponse = (text, response) => {
  return {
    type: SUGGESTIONS_SUCCESS,
    text,
    response
  }
};

const restructureJsonResponse = json =>
    _.get(json, 'grouped.category.groups', [])
     .map(category => ({
       name: category.groupValue,
       suggestions: _.get(category.doclist, 'docs').map(doc => _.pick(doc, 'category', 'display_name', 'fq_field', 'fq_value', 'id', 'num_genes', 'score'))
     }));

 const restructureJsonResponse2 = json =>
   _.get(json, 'response.docs', {})
 .map(doc => _.pick(doc, 'name', 'id', 'description'));

export const fetchSuggestions = (text, target) => dispatch => {
  dispatch(clearInput(target));
  dispatch(suggestionsRequest(text));

  if(_.isEmpty(text)) {
    dispatch(suggestionsResponse(text, []))
  }

  else {
    return fetch(`http://devdata.gramene.org/v53/suggest?q=${encodeURIComponent(text)}*`)
        .then(response => response.json())
        .then(json => dispatch(suggestionsResponse(text, restructureJsonResponse(json))))
        .catch(error => dispatch(suggestionsFailure(text, error)))
  }
};

export const retrieveSelectedSuggestion = text => dispatch => {
  dispatch(suggestionsRequest(text));
    return fetch(`http://data.gramene.org/v53/search?q=(_terms:${encodeURIComponent(text)})`)
        .then(response => response.json())
        .then(json => dispatch(selectSuggestion(text, restructureJsonResponse2(json))))
        .catch(error => dispatch(suggestionsFailure(text, error)))
};
