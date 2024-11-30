import './App.css';
import Header from './components/Header';
import Board from './components/Board';
import Sidebar from './components/Sidebar';
import { useReducer, useState, useEffect } from 'react';
import { Histories, Record } from './types/types';

type Action =
  | { type: 'ADD'; records: string[] }
  | { type: 'BACK'; key: number }
  | { type: 'RESET' };

const reducer = (state: Histories, action: Action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.records];
    case 'BACK':
      return [...state].slice(0, action.key + 1);
    case 'RESET':
      return [];
    default:
      return state;
  }
};

// 컴포넌트 구조가 깊지 않기 때문에 props로 상태 전달하고 관리
function App() {
  const [histories, dispatch] = useReducer(reducer, []); // 진행된 턴의 누적 기록 보관
  const [turn, setTurn] = useState('O'); // 누구 차례인지, 처음은 O부터 시작
  const [goBack, setGoBack] = useState(false);
  const [doReset, setDoReset] = useState(false);

  useEffect(() => {
    console.log(histories);
  }, [histories]);

  const handleHistoriesAdd = (records: string[]) => {
    dispatch({
      type: 'ADD',
      records,
    });
  };

  const handleHistoriesBack = (key: number) => {
    setGoBack(true);
    dispatch({
      type: 'BACK',
      key,
    });
  };

  const handleHistoriesReset = () => {
    setDoReset(true);
    dispatch({
      type: 'RESET',
    });
  };

  return (
    <div>
      <Header turn={turn} handleHistoriesReset={handleHistoriesReset} />
      <div className='contents'>
        <Board
          turn={turn}
          goBack={goBack}
          doReset={doReset}
          histories={histories}
          setTurn={setTurn}
          setGoBack={setGoBack}
          setDoReset={setDoReset}
          handleHistoriesAdd={handleHistoriesAdd}
        />
        <Sidebar histories={histories} handleHistoriesBack={handleHistoriesBack} />
      </div>
    </div>
  );
}

export default App;
