import { Player } from './player';
import { GameSetupDto } from '../../game/dto/game-setup.dto';

export class CreatePlayersDto {
  player1: Player;
  player2: Player;
  turn: string;

  constructor(gameSetupDto: GameSetupDto) {
    this.player1 = new Player(
      gameSetupDto.player1Name,
      gameSetupDto.player1Symbol,
    );
    this.player2 = new Player(
      gameSetupDto.player2Name,
      gameSetupDto.player2Symbol,
    );
    this.turn = this.player1.getPlayerName();
  }
}
