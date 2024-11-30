import { useEffect, useState } from 'react';
import './Board.css';
import { Record } from '../types/types';

interface Props {
  turn: string;
  goBack: boolean;
  doReset: boolean;
  histories: Record[];
  setTurn: React.Dispatch<React.SetStateAction<string>>;
  setGoBack: React.Dispatch<React.SetStateAction<boolean>>;
  setDoReset: React.Dispatch<React.SetStateAction<boolean>>;
  handleHistoriesAdd: (record: string[]) => void;
}

const Board = ({
  turn,
  goBack,
  doReset,
  histories,
  setTurn,
  setGoBack,
  setDoReset,
  handleHistoriesAdd,
}: Props) => {
  const [alert, setAlert] = useState(false);
  const [records, setRecords] = useState<Record>(Array(9).fill(''));

  // space 클릭할 때마다 O-X 화면에 표시하고 records에 기록
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement; // dataset 가져오기 위해 e.target을 HTMLElement 타입으로 단언

    // 한 번 둔 위치에 다시 두면 안내 문구 보여주기
    if (records[Number(target.dataset.space)] !== '') {
      setAlert(true);
      return;
    }

    // 새로운 위치라면 records에 반영
    const newRecords = records.slice(); // setRecords 할 새로운 newRecords 복제
    newRecords[Number(target.dataset.space)] = turn;
    setRecords(newRecords); // records 반영
    setTurn(turn === 'O' ? 'X' : 'O'); // turn 변경
    alert ? setAlert(false) : ''; // alert가 켜졌었다면 끄기
  };

  /** 여기 두 useEffect 구조가 너무 지저분해서, 변경 필요 **/
  useEffect(() => {
    console.log(goBack);
    // records 값 변경되면 histories도 변경
    if (!goBack) {
      handleHistoriesAdd(records); // histories에 값 반영
    }

    setGoBack(false);
    setDoReset(false);
  }, [records]);

  useEffect(() => {
    if (goBack || doReset) {
      if (histories.length) {
        setRecords(histories[histories.length - 1]);
      } else {
        setRecords(Array(9).fill(''));
      }
    }
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
