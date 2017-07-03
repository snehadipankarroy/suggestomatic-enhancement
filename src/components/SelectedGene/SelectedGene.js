import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

const SelectedGene = ({isFetching, categories, text}) => {
  let content;
  content = categories.map(c => <tr key={c.id}><td>{c.id}</td><td>{c.name}</td><td>{c.description}</td></tr>);
  return (
      <section className="suggestions">
        <table>
          <caption>{text}</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {content}
          </tbody>
        </table>
      </section>
);
};

const mapStateToProps = (state) => {
  return state.suggestSelect || {};
};

const ConnectedSelectedGene = connect(mapStateToProps)(SelectedGene);

export default ConnectedSelectedGene;
