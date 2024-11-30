import { useContext } from 'react';
import { StateContext, DispatchContext } from '../App';
import { Dispatch, State } from '../types/types';
import useCreateRecords from './useCreateRecords';

interface Props {
  alert: boolean;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const useTurnOver = ({ alert, setAlert }: Props) => {
  const { histories, records, turn } = useContext(StateContext) as State;
  const { setRecords, setTurn, handleHistoriesAdd } = useContext(DispatchContext) as Dispatch;

  setRecords(histories[histories.length - 1]);
  setTurn(turn === 'O' ? 'X' : 'O'); // turn 변경
  if (alert) setAlert(false); // alert true면 false로 변경
};

export default useTurnOver;
