import { GameSetupDto } from '../dto/game-setup.dto';

export interface Game {
  startGame(gameSetupDto: GameSetupDto);
  finishGame(boardId: number);
  isPlayersNamesTheSame(gameSetupDto: GameSetupDto);
  getGameInfo();
}
