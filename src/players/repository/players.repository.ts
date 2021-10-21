import { GameSetupDto } from '../../game/dto/game-setup.dto';

export interface PlayersRepository {
  deletePlayers(playersId: number);
  findPlayers(playersId: number);
  savePlayers(players);
  createPlayers(gameSetupDto: GameSetupDto);
}
