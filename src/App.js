import logo from './logo.svg';
// import './App.css';

import Navi from "./navigation/navi";
import Switcher from './navigation/switcher';

function App() {
  return (
    <div className="app">
      <header className="appHead">
        <Navi />
        <Switcher />
      </header>
    </div>
  );
}

export default App;
