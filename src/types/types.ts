export type Records = string[];
export type Histories = Records[];
export type Scores = { [key: string]: number };
export type DispatchAction =
  | { type: 'ADD'; records: string[] }
  | { type: 'BACK'; key: number }
  | { type: 'RESET' };

export interface State {
  histories: Histories;
  turn: string;
  scores: Scores;
}

export interface Dispatch {
  handleHistoriesAdd: (records: Records) => void;
  handleHistoriesBack: (key: number) => void;
  handleHistoriesReset: () => void;
  setTurn: React.Dispatch<React.SetStateAction<string>>;
  setScores: React.Dispatch<React.SetStateAction<Scores>>;
}
