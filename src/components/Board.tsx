import { useEffect, useState } from 'react';
import './Board.css';
import { Records, Scores } from '../types/types';
import { WINNING_CONDITION } from '../constants/winning-condition';

interface Props {
  turn: string;
  records: Records;
  scores: Scores;
  histories: Records[];
  setTurn: React.Dispatch<React.SetStateAction<string>>;
  setRecords: React.Dispatch<React.SetStateAction<Records>>;
  setScores: React.Dispatch<React.SetStateAction<Scores>>;
  handleHistoriesAdd: (record: string[]) => void;
  handleHistoriesReset: () => void;
}

const Board = ({
  turn,
  records,
  scores,
  histories,
  setTurn,
  setRecords,
  setScores,
  handleHistoriesAdd,
  handleHistoriesReset,
}: Props) => {
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

  // records 변경되면 승리 조건 파악하고 충족 시 끝내기
  useEffect(() => {
    let checker = false;
    // 승리 조건에 해당하는 경우 있는지 확인
    WINNING_CONDITION.forEach((condition) => {
      const condition0 = records[condition[0]] !== '';
      const condition1 = records[condition[0]] === records[condition[1]];
      const condition2 = records[condition[0]] === records[condition[2]];

      if (condition0 && condition1 && condition2) {
        scores[turn === 'O' ? 'X' : 'O'] += 1;
        setScores({ ...scores });
        if (window.confirm(`${turn === 'O' ? 'X' : 'O'} 승리하였습니다. 다시 할까요?`)) {
          handleHistoriesReset();
        }

        checker = true;
      }
    });

    if (histories.length === 10 && !checker) {
      // 마지막 칸까지 다 둔건지 확인하고 그 안에 승부 안 났으면 무승부
      if (window.confirm('무승부입니다. 다시 할까요?')) {
        handleHistoriesReset();
      }
    }
  }, [records]);

  return (
    <div className='board-container'>
      <table>
        <tbody className='board' onClick={handleClick}>
          <tr className='board-row'>
            <td className='space' data-space='0'>
              {histories[histories.length - 1][0]}
            </td>
            <td className='space' data-space='1'>
              {histories[histories.length - 1][1]}
            </td>
            <td className='space' data-space='2'>
              {histories[histories.length - 1][2]}
            </td>
          </tr>
          <tr className='board-row'>
            <td className='space' data-space='3'>
              {histories[histories.length - 1][3]}
            </td>
            <td className='space' data-space='4'>
              {histories[histories.length - 1][4]}
            </td>
            <td className='space' data-space='5'>
              {histories[histories.length - 1][5]}
            </td>
          </tr>
          <tr className='board-row'>
            <td className='space' data-space='6'>
              {histories[histories.length - 1][6]}
            </td>
            <td className='space' data-space='7'>
              {histories[histories.length - 1][7]}
            </td>
            <td className='space' data-space='8'>
              {histories[histories.length - 1][8]}
            </td>
          </tr>
        </tbody>
      </table>
      <p className={`alert ${alert ? 'on' : 'off'}`}>해당 위치엔 둘 수 없습니다.</p>
    </div>
  );
};

export default Board;
