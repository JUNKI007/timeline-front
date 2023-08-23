import React from 'react';
import logo from './logo.svg';
import './App.css';
import MyRoutes from './routes/MyRoutes';
import { Provider } from 'react-redux';
import store from './app/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MyRoutes />
      </div>
    </Provider>
  );
}

export default App;
