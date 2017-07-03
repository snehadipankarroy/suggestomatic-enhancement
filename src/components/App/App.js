import React from 'react';
import { Provider } from 'react-redux';

// import logo from './logo.svg';
import './App.css';

import { store } from '../../state/store';
import Input from "../Input/Input";
import Suggestions from "../Suggestions/Suggestions";
import SelectedGene from "../SelectedGene/SelectedGene";


const App = () => (
    <div className="container">
      <Input/>
      <Suggestions/>
      <SelectedGene/>
    </div>
);

const WrappedApp = () => (
    <Provider store={store}>
      <App />
    </Provider>
);

export default WrappedApp;
