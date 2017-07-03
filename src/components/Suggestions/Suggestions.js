import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {retrieveSelectedSuggestion} from "../../state/actions";

import './Suggestions.css';

const Suggestions = ({isFetching, categories, onClick}) => {
  let content;

  const Category = ({name, suggestions}) =>
    <div className="category">
      <h2>{name}</h2>
      <ul>
        {suggestions.map(s => <Suggestion key={s.id} suggestion={s}/>)}
      </ul>
    </div>;

    const Suggestion = ({suggestion}) =>
      <li className="suggestion">
        <a onClick={e => onClick(e.target.innerHTML)}>{suggestion.display_name}</a>
      </li>;

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

const mapDispatchToProps = dispatch => ({
  onClick: text => dispatch(retrieveSelectedSuggestion(text))
});

const ConnectedSuggestions = connect(mapStateToProps, mapDispatchToProps)(Suggestions);

export default ConnectedSuggestions;
