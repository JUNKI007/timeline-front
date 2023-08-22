import './App.css';
import { MyHeader } from './components/template/MyHeader';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import User from './components/user/User';
import MyRoutes from './routes/MyRoutes';

function App() {
  return (
    //<div className="App">
    <MyRoutes></MyRoutes>
    //</div>
  );
}

export default App;
