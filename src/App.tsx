import './App.css';
import Header from './components/Header';
import Board from './components/Board';
import Sidebar from './components/Sidebar';
import { useReducer, useState, useEffect } from 'react';
import { Histories } from './types/types';

type Action = { type: string; record: string[] };

const reducer = (state: Histories, action: Action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.record];
    default:
      return state;
  }
};

// 컴포넌트 구조가 깊지 않기 때문에 props로 상태 전달하고 관리
function App() {
  const [histories, dispatch] = useReducer(reducer, []); // 진행된 턴의 누적 기록 보관
  const [turn, setTurn] = useState('O'); // 누구 차례인지, 처음은 O부터 시작

  useEffect(() => {
    console.log(histories);
  });

  const handleHistoriesAdd = (record: string[]) => {
    dispatch({
      type: 'ADD',
      record,
    });
  };

  return (
    <div>
      <Header turn={turn} />
      <div className='contents'>
        <Board turn={turn} setTurn={setTurn} handleHistoriesAdd={handleHistoriesAdd} />
        <Sidebar histories={histories} />
      </div>
    </div>
  );
}

export default App;
