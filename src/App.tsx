import './App.css';
import Header from './components/Header';
import Board from './components/Board';
import Sidebar from './components/Sidebar';
import { useReducer, useState } from 'react';
import { Histories, Record } from './types/types';

type Action = { type: string };

const reducer = (state: Histories, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// 컴포넌트가 깊지 않기 때문에 props로 상태 전달하고 관리
function App() {
  const initState: Histories = [Array(9).fill('')];
  const [histories, dispatch] = useReducer(reducer, initState); // 진행된 턴의 누적 기록 보관
  const [turn, setTurn] = useState('O'); // 누구 차례인지, 처음은 O부터 시작

  return (
    <div>
      <Header turn='O' />
      <div className='contents'>
        <Board />
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
