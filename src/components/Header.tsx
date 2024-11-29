import './Header.css';

interface Props {
  player: string;
}

const Header = ({ player }: Props) => {
  return (
    <div className='header'>
      <div className='turn'>{`현재 ${player}의 턴입니다`}</div>
      <div className='score'>{`O : ${10} : ${2} : X`}</div>
      <div className='re-start'>
        <button>다시하기</button>
      </div>
    </div>
  );
};

export default Header;
