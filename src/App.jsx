
import { MyHeader } from './components/template/MyHeader';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import User from './components/user/User';
import MyRoutes from './routes/MyRoutes';
import React from 'react';
import logo from './logo.svg';
import './App.css';
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
