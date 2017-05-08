import React from 'react';
import { connect } from 'react-redux';
import {fetchSuggestions} from "../../state/actions";

import './Input.css';

const Input = ({onChange}) =>
    <label>
      <h1>Gene Suggestomatic</h1>
      <input placeholder="start typing" type="text" onChange={e => onChange(e.target.value)}/>
    </label>;

const mapDispatchToProps = dispatch => ({
  onChange: text => dispatch(fetchSuggestions(text))
});

const ConnectedInput = connect(null, mapDispatchToProps)(Input);

export default ConnectedInput;