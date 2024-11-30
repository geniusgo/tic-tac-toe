import { Scores } from '../types/types';
import './Header.css';

interface Props {
  turn: string;
  scores: Scores;
  setScores: React.Dispatch<React.SetStateAction<Scores>>;
  handleHistoriesReset: () => void;
}

const Header = ({ turn, scores, setScores, handleHistoriesReset }: Props) => {
  const handleGameResetClick = (e: React.MouseEvent<HTMLElement>) => {
    handleHistoriesReset();
  };

  const handleScoreResetClick = (e: React.MouseEvent<HTMLElement>) => {
    setScores({ O: 0, X: 0 });
  };

  return (
    <div className='header'>
      <div className='turn'>{`현재 ${turn}의 턴입니다`}</div>
      <div className='score'>{`O: ${scores['O']} vs X: ${scores['X']}`}</div>
      <button onClick={handleScoreResetClick}>Score 초기화</button>
      <div className='re-start'>
        <button onClick={handleGameResetClick}>다시하기</button>
      </div>
    </div>
  );
};

export default Header;
