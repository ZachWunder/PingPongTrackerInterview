export enum Winner {
  p1 = "p1",
  p2 = "p2",
  tie = "tie"
}
type Game = {
  id: string;
  p1: string;
  p2: string;
  p1Score: number;
  p2Score: number;
  winner: Winner;
  time: string;
};

export default Game;
