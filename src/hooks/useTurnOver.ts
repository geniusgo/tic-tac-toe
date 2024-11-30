import { useContext } from 'react';
import { StateContext, DispatchContext } from '../App';
import { Dispatch, State } from '../types/types';
import useCreateRecords from './useCreateRecords';

interface Props {
  target: HTMLElement;
  alert: boolean;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const useTurnOver = ({ target, alert, setAlert }: Props) => {
  const { records, turn } = useContext(StateContext) as State;
  const { handleHistoriesAdd, setTurn } = useContext(DispatchContext) as Dispatch;

  handleHistoriesAdd(useCreateRecords(records, target, turn)); // 새로 두는 곳이면 newRecords 배열 만들어서 histories 상태 업데이트
  setTurn(turn === 'O' ? 'X' : 'O'); // turn 변경
  if (alert) setAlert(false); // alert true면 false로 변경
};

export default useTurnOver;
