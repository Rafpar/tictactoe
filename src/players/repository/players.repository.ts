import { GameSetupDto } from '../../game/dto/game-setup.dto';
import { PlayersEntity } from '../schemas/players.schema';

export interface PlayersRepository {
  deletePlayers();
  findPlayers();
  savePlayers(players: Promise<PlayersEntity & Document & { _id: any }>);
  createPlayers(gameSetupDto: GameSetupDto);
}
