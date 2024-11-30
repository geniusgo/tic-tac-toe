import { DispatchAction } from '../types/types';

const useDispatchInit = (dispatch: React.Dispatch<DispatchAction>) => {
  const handleHistoriesAdd = (records: string[]) => {
    dispatch({
      type: 'ADD',
      records,
    });
  };

  const handleHistoriesBack = (key: number) => {
    dispatch({
      type: 'BACK',
      key,
    });
  };

  const handleHistoriesReset = () => {
    dispatch({
      type: 'RESET',
    });
  };

  return { handleHistoriesAdd, handleHistoriesBack, handleHistoriesReset };
};

export default useDispatchInit;
