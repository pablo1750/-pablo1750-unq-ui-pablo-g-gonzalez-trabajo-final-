import logo from './logo.svg';
import './App.css';
import { Game } from './components/Game';

function App() {
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">RPSLS Game</a>
    </nav>
    <div className="App">
      <Game/>
    </div>
    </>
  );
}

export default App;
