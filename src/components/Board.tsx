import { useEffect, useState } from 'react';
import './Board.css';
import { Record } from '../types/types';

interface Props {
  turn: string;
  setTurn: React.Dispatch<React.SetStateAction<string>>;
}

const Board = ({ turn, setTurn }: Props) => {
  const [records, setRecords] = useState<Record>(Array(9).fill(''));

  // space 클릭할 때마다 O-X 화면에 표시하고 records에 기록
  const handleClick = (e: React.MouseEvent<HTMLTableElement>) => {
    const target = e.target as HTMLElement; // dataset 가져오기 위해 e.target을 HTMLElement 타입으로 단언
    records[Number(target.dataset.space)] = turn;
    setRecords([...records]);
    setTurn(turn === 'O' ? 'X' : 'O');
  };

  return (
    <table className='board' onClick={handleClick}>
      <tr className='board-row'>
        <td className='space' data-space='0'>
          {records[0]}
        </td>
        <td className='space' data-space='1'>
          {records[1]}
        </td>
        <td className='space' data-space='2'>
          {records[2]}
        </td>
      </tr>
      <tr className='board-row'>
        <td className='space' data-space='3'>
          {records[3]}
        </td>
        <td className='space' data-space='4'>
          {records[4]}
        </td>
        <td className='space' data-space='5'>
          {records[5]}
        </td>
      </tr>
      <tr className='board-row'>
        <td className='space' data-space='6'>
          {records[6]}
        </td>
        <td className='space' data-space='7'>
          {records[7]}
        </td>
        <td className='space' data-space='8'>
          {records[8]}
        </td>
      </tr>
    </table>
  );
};

export default Board;
