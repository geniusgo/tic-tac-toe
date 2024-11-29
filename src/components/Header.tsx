import './Header.css';

interface Props {
  turn: string;
}

const Header = ({ turn }: Props) => {
  return (
    <div className='header'>
      <div className='turn'>{`현재 ${turn}의 턴입니다`}</div>
      <div className='score'>{`O: ${10} vs X: ${2}`}</div>
      <div className='re-start'>
        <button>다시하기</button>
      </div>
    </div>
  );
};

export default Header;
