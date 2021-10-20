export interface Players {
  removePlayers();
  isCurrentPlayerTurn(currentPlayerName: string): Promise<boolean>;
  setPlayerTurn(currenPlayerName: string);
  getPlayerSymbol(playerName: string): Promise<string>;
}
