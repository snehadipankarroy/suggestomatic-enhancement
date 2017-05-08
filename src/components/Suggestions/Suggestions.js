import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import './Suggestions.css'

const Suggestion = ({suggestion}) =>
  <li className="suggestion">
    <a>{suggestion.display_name}</a>
  </li>;

const Category = ({name, suggestions}) =>
  <div className="category">
    <h2>{name}</h2>
    <ul>
      {suggestions.map(s => <Suggestion key={s.id} suggestion={s}/>)}
    </ul>
  </div>;

const Suggestions = ({isFetching, categories}) => {
  let content;
  if(isFetching) {
    content = <div className="loading">Loading</div>;
  }
  else if(_.isEmpty(categories)) {
    content = <div className="error">No suggestions</div>;
  }
  else {
    content = categories.map(c => <Category key={c.name} name={c.name} suggestions={c.suggestions}/>);
  }
  return (
      <section className="suggestions">
        {content}
      </section>
  );
};

const mapStateToProps = (state) => {
  return state.suggestionsForText[state.suggestText] || {};
};

const ConnectedSuggestions = connect(mapStateToProps)(Suggestions);

export default ConnectedSuggestions;
