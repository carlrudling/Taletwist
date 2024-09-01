export interface IGameStatement {
  statement: string;       // The incomplete statement/question that the player will receive
  completedStatement?: string;  // The completed statement after the player has added their input (optional at first)
  playerName?: string;     // The name of the player who completed the statement (optional at first)
}
