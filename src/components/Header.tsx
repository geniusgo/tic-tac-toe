import './Header.css';

interface Props {
  turn: string;
  handleHistoriesReset: () => void;
}

const Header = ({ turn, handleHistoriesReset }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    handleHistoriesReset();
  };

  return (
    <div className='header'>
      <div className='turn'>{`현재 ${turn}의 턴입니다`}</div>
      <div className='score'>{`O: ${0} vs X: ${1}`}</div>
      <div className='re-start'>
        <button onClick={handleClick}>다시하기</button>
      </div>
    </div>
  );
};

export default Header;
