import './Board.css';
import { useEffect, useState, useContext } from 'react';
import { Dispatch, State, Records } from '../types/types';
import { WINNING_CONDITION } from '../constants/winning-condition';
import useCreateRecords from '../hooks/useCreateRecords';
import { StateContext, DispatchContext } from '../App';

/** 승리 여부를 판단해주는 함수 **/
const isWinning = (records: Records) => {
  const win = WINNING_CONDITION.filter((condition) => {
    const condition0 = records[condition[0]] !== '';
    const condition1 = records[condition[0]] === records[condition[1]];
    const condition2 = records[condition[0]] === records[condition[2]];

    return condition0 && condition1 && condition2;
  });

  return !!win.length;
};

/** Board 컴포넌트 **/
const Board = () => {
  const { turn, scores, histories } = useContext(StateContext) as State;
  const { setTurn, setScores, handleHistoriesAdd, handleHistoriesReset } = useContext(
    DispatchContext
  ) as Dispatch;
  const [alert, setAlert] = useState(false);
  const [winner, setWinner] = useState('');

  /** Board 클릭 시 동작, 한번 둔 곳에 다시 두면 alert 문구 보내주기 */
  const handleBoardClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    histories[histories.length - 1][Number(target.dataset.space)] !== ''
      ? setAlert(true)
      : handleHistoriesAdd(useCreateRecords(histories[histories.length - 1], target, turn)); // 새로 두는 곳이면 newRecords 배열 만들어서 histories 상태 업데이트
  };

  /**
   * 한 턴이 지나고, histories 업데이트 됐을 때 동작
   * - 승리 조건에 해당하는지 확인하고, 이겼으면 그에 대한 처리
   * - 9칸 다 채울 때까지 승리자 없으면 Draw로 확인하고 그에 대한 처리
   * - 둘 다 아닐 땐 턴을 넘기고, 한 번 채운 블록 다시 눌러서 alert 생겼으면 지우기
   */
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

  /**
   * 게임 종료
   * - 누군가 이겼으면 스코어 올려주고, 다시 할지 유저에게 물어본 다음 초기화
   * - 비겼으면 스코어 변화 없이 다시 할지 물어보고 초기화
   */
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
