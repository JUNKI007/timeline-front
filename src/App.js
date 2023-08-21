import logo from './logo.svg';
import './App.css';
import { MyHeader } from './components/template/MyHeader';
import MyRoutes from './routes/MyRoutes';

function App() {
  return (
    <div className="App">
      <MyRoutes></MyRoutes>
    </div>
  );
}

export default App;
