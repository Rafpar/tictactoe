export interface Players {
  removePlayers(playersId: number);
  isCurrentPlayerTurn(currentPlayerName: string, playersId: number): Promise<boolean>;
  setPlayerTurn(currenPlayerName: string, playersId: number);
  getPlayerSymbol(playerName: string, playersId: number): Promise<string>;
}
