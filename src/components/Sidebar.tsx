import './Sidebar.css';
import { Record } from '../types/types';

interface Props {
  histories: Record[];
}

const Sidebar = ({ histories }: Props) => {
  return (
    <div className='sidebar'>
      <h4>Turn 기록</h4>
      {histories.map((_, idx) => {
        if (idx < 2) return;
        return <button key={idx}>{`${idx - 1} 번째 turn`}</button>;
      })}
    </div>
  );
};

export default Sidebar;
