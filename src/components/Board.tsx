import './Board.css';
import { useEffect, useState, useContext } from 'react';
import { Dispatch, State, Records } from '../types/types';
import { WINNING_CONDITION } from '../constants/winning-condition';
import useCreateRecords from '../hooks/useCreateRecords';
import useTurnOver from '../hooks/useTurnOver';
import { StateContext, DispatchContext } from '../App';

const isWinning = (records: Records) => {
  const win = WINNING_CONDITION.filter((condition) => {
    const condition0 = records[condition[0]] !== '';
    const condition1 = records[condition[0]] === records[condition[1]];
    const condition2 = records[condition[0]] === records[condition[2]];

    return condition0 && condition1 && condition2;
  });

  return !!win.length;
};

const Board = () => {
  const { turn, scores, histories } = useContext(StateContext) as State;
  const { setTurn, setScores, handleHistoriesAdd, handleHistoriesReset } = useContext(
    DispatchContext
  ) as Dispatch;
  const [alert, setAlert] = useState(false);
  const [winner, setWinner] = useState('');

  // 한 번 둔 위치에 다시 두면 안내 문구 보여주고, 아니면 TurnOver 동작 수행
  const handleBoardClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    histories[histories.length - 1][Number(target.dataset.space)] !== ''
      ? setAlert(true)
      : handleHistoriesAdd(useCreateRecords(histories[histories.length - 1], target, turn)); // 새로 두는 곳이면 newRecords 배열 만들어서 histories 상태 업데이트
  };

  // turn over 동작: 승리 여부 확인, turn, alert 업데이트
  useEffect(() => {
    const win = isWinning(histories[histories.length - 1]); // 이기는 조건에 해당하는지 확인

    if (win) {
      setWinner(`${turn}`);
    } else if (histories.length === 10) {
      setWinner('D');
    } else {
      setTurn(turn === 'O' ? 'X' : 'O'); // turn 변경
      if (alert) setAlert(false); // alert true면 false로 변경
    }
  }, [histories]);

  // Game 종료 동작
  useEffect(() => {
    if (winner === 'O' || winner === 'X') {
      scores[turn] += 1;
      setScores({ ...scores });
      if (window.confirm(`${turn} 승리하였습니다. 다시 할까요?`)) {
        handleHistoriesReset();
      }
      return;
    }

    if (winner === 'D') {
      if (window.confirm('무승부입니다. 다시 할까요?')) {
        handleHistoriesReset();
      }
    }
  }, [winner]);

  return (
    <div className='board-container'>
      <table>
        <tbody className='board' onClick={handleBoardClick}>
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
