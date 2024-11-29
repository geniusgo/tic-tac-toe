import './App.css';
import Header from './components/Header';
import Board from './components/Board';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div>
      <Header player='O' />
      <div className='contents'>
        <Board />
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
