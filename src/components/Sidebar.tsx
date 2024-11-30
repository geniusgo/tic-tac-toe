import './Sidebar.css';
import { Records } from '../types/types';

interface Props {
  histories: Records[];
  handleHistoriesBack: (key: number) => void;
}

const Sidebar = ({ histories, handleHistoriesBack }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    handleHistoriesBack(Number(target.id));
  };

  return (
    <div className='sidebar'>
      <h4>Turn 기록</h4>
      {histories.map((_, idx) => {
        if (idx === 0) return;
        // key를 인덱스로 하는 게 좀 찝찝해서, 변경 고민해보기
        return (
          <button id={String(idx)} key={idx} onClick={handleClick}>{`${idx} 번째 turn`}</button>
        );
      })}
    </div>
  );
};

export default Sidebar;
