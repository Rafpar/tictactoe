import { Player } from './player';
import { GameSetupDto } from '../../game/dto/game-setup.dto';

export class CreatePlayersDto {
  _id: number;
  player1: Player;
  player2: Player;
  turn: string;

  constructor(gameSetupDto: GameSetupDto) {
    this._id = gameSetupDto.id;
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
