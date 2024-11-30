import './Sidebar.css';
import { useContext } from 'react';
import { Dispatch, Records, State } from '../types/types';
import { StateContext, DispatchContext } from '../App';

const Sidebar = () => {
  const { histories } = useContext(StateContext) as State; // null이 아님을 단언
  const { handleHistoriesBack } = useContext(DispatchContext) as Dispatch; // null이 아님을 단언

  const handleHistories = (e: React.MouseEvent<HTMLElement>) => {
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
          <button id={String(idx)} key={idx} onClick={handleHistories}>{`${idx} 번째 turn`}</button>
        );
      })}
    </div>
  );
};

export default Sidebar;
