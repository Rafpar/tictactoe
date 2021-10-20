import { GameSetupDto } from '../dto/game-setup.dto';

export interface Game {
  startGame(gameSetupDto: GameSetupDto);
  finishGame();
  isPlayersNamesTheSame(gameSetupDto: GameSetupDto);
}
