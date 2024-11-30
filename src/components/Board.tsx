import { useEffect, useState } from 'react';
import './Board.css';
import { Records } from '../types/types';

interface Props {
  turn: string;
  records: Records;
  histories: Records[];
  setTurn: React.Dispatch<React.SetStateAction<string>>;
  setRecords: React.Dispatch<React.SetStateAction<Records>>;
  handleHistoriesAdd: (record: string[]) => void;
}

const Board = ({ turn, records, histories, setTurn, setRecords, handleHistoriesAdd }: Props) => {
  const [alert, setAlert] = useState(false);

  // space 클릭할 때마다 O-X 화면에 표시하고 records에 기록
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement; // dataset 가져오기 위해 e.target을 HTMLElement 타입으로 단언

    // 한 번 둔 위치에 다시 두면 안내 문구 보여주기
    if (records[Number(target.dataset.space)] !== '') {
      setAlert(true);
      return;
    }

    // 새로 두는 곳이면 newRecords 배열 만들어서 histories 상태 업데이트
    const newRecords = records.slice(); // setRecords 할 새로운 newRecords 복제
    newRecords[Number(target.dataset.space)] = turn;
    handleHistoriesAdd(newRecords);

    // turn 변경하고, 혹시 alert 떴었으면 false로 변경
    setTurn(turn === 'O' ? 'X' : 'O');
    if (alert) setAlert(false);
  };

  // histories 값 바뀌고 나면 마지막 인덱스 배열로 records 값 변경
  useEffect(() => {
    setRecords(histories[histories.length - 1]);
  }, [histories]);

  return (
    <div className='board-container'>
      <table>
        <tbody className='board' onClick={handleClick}>
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
        </tbody>
      </table>
      <p className={`alert ${alert ? 'on' : 'off'}`}>해당 위치엔 둘 수 없습니다.</p>
    </div>
  );
};

export default Board;
