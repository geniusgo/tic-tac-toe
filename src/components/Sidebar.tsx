import './Sidebar.css';
import { useContext } from 'react';
import { Dispatch, Records, State } from '../types/types';
import { StateContext, DispatchContext } from '../App';

/** Sidebar 컴포넌트 **/
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
        return (
          <button id={String(idx)} key={idx} onClick={handleHistories}>{`${idx} 번째 turn`}</button>
        );
      })}
    </div>
  );
};

export default Sidebar;
