import './App.css';
import { useReducer, useState, createContext } from 'react';
import { Histories, Records, Scores, DispatchAction, State, Dispatch } from './types/types';
import useDispatch from './hooks/useDispatch';
import Header from './components/Header';
import Board from './components/Board';
import Sidebar from './components/Sidebar';

/** histories 상태 변경 dispatch 함수 **/
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

/** 하위 컴포넌트에 전달할 상태 생성 **/
export const StateContext = createContext<State | null>(null);
export const DispatchContext = createContext<Dispatch | null>(null);

function App() {
  const [histories, dispatch] = useReducer(reducer, [Array(9).fill('')]); // 진행된 턴의 누적 기록 보관
  const [turn, setTurn] = useState('O'); // 누구 차례인지, 처음은 O부터 시작
  const [scores, setScores] = useState<Scores>({ O: 0, X: 0 });

  // dispatch 감싼 이벤트 함수들 초기화
  const { handleHistoriesAdd, handleHistoriesBack, handleHistoriesReset } = useDispatch(dispatch);

  return (
    <StateContext.Provider value={{ histories, turn, scores }}>
      <DispatchContext.Provider
        value={{
          handleHistoriesAdd,
          handleHistoriesBack,
          handleHistoriesReset,
          setTurn,
          setScores,
        }}
      >
        <div>
          <Header />
          <div className='contents'>
            <Board />
            <Sidebar />
          </div>
        </div>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
