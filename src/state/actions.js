import fetch from 'isomorphic-fetch'
import _ from 'lodash';

export const SUGGESTIONS_REQUEST = 'SUGGESTIONS_REQUEST';
export const SUGGESTIONS_FAILURE = 'SUGGESTIONS_FAILURE';
export const SUGGESTIONS_SUCCESS = 'SUGGESTIONS_SUCCESS';

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

export const fetchSuggestions = text => dispatch => {
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