import './Header.css';
import { Scores } from '../types/types';

interface Props {
  turn: string;
  scores: Scores;
  setScores: React.Dispatch<React.SetStateAction<Scores>>;
  handleHistoriesReset: () => void;
}

const Header = ({ turn, scores, setScores, handleHistoriesReset }: Props) => {
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
