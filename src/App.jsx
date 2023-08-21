import './App.css';
import { MyHeader } from './components/template/MyHeader';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import User from './components/user/User';

function App() {
  return (
    <div className="App">
      <MyHeader></MyHeader>
      <Signup></Signup>
      <Login></Login>
      <User></User>
    </div>
  );
}

export default App;
