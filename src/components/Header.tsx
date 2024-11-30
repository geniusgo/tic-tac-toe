import './Header.css';
import { useContext } from 'react';
import { Dispatch, Scores, State } from '../types/types';
import { StateContext, DispatchContext } from '../App';

const Header = () => {
  const { turn, scores } = useContext(StateContext) as State; // null이 아님을 단언
  const { setScores, handleHistoriesReset } = useContext(DispatchContext) as Dispatch; // null이 아님을 단언

  const handleGameReset = (e: React.MouseEvent<HTMLElement>) => {
    handleHistoriesReset();
  };

  const handleScoreReset = (e: React.MouseEvent<HTMLElement>) => {
    setScores({ O: 0, X: 0 });
  };

  return (
    <div className='header'>
      <div className='turn'>{`현재 ${turn}의 턴입니다`}</div>
      <div className='score'>{`O: ${scores['O']} vs X: ${scores['X']}`}</div>
      <button onClick={handleScoreReset}>Score 초기화</button>
      <div className='re-start'>
        <button onClick={handleGameReset}>다시하기</button>
      </div>
    </div>
  );
};

export default Header;
