import { GameSetupDto } from '../../game/dto/game-setup.dto';

export interface PlayersRepository {
  deletePlayers();
  findPlayers();
  savePlayers(players);
  createPlayers(gameSetupDto: GameSetupDto);
}
