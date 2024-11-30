import './App.css';
import { useReducer, useState, createContext } from 'react';
import { Histories, Records, Scores, DispatchAction, State, Dispatch } from './types/types';
import useDispatch from './hooks/useDispatch';
import Header from './components/Header';
import Board from './components/Board';
import Sidebar from './components/Sidebar';

const reducer = (state: Histories, action: DispatchAction) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.records];
    case 'BACK':
      return [...state].slice(0, action.key + 1);
    case 'RESET':
      return [Array(9).fill('')];
    default:
      return state;
  }
};

const StateContext = createContext<React.Context<State> | null>(null);
const DispatchContext = createContext<React.Context<Dispatch> | null>(null);

// 커스텀 훅까지 고려해서, 상태들을 Context로 관리
function App() {
  const [histories, dispatch] = useReducer(reducer, [Array(9).fill('')]); // 진행된 턴의 누적 기록 보관
  const [turn, setTurn] = useState('O'); // 누구 차례인지, 처음은 O부터 시작
  const [records, setRecords] = useState<Records>(() => histories[histories.length - 1]);
  const [scores, setScores] = useState<Scores>({ O: 0, X: 0 });

  // dispatch 감싼 이벤트 함수들 초기화
  const { handleHistoriesBack, handleHistoriesReset } = useDispatch(dispatch);

  return (
    <div>
      <Header
        turn={turn}
        scores={scores}
        setScores={setScores}
        handleHistoriesReset={handleHistoriesReset}
      />
      <div className='contents'>
        <Board
          turn={turn}
          histories={histories}
          records={records}
          scores={scores}
          setTurn={setTurn}
          setRecords={setRecords}
          setScores={setScores}
          dispatch={dispatch}
        />
        <Sidebar histories={histories} handleHistoriesBack={handleHistoriesBack} />
      </div>
    </div>
  );
}

export default App;
