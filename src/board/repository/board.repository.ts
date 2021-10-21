import { GameSetupDto } from '../../game/dto/game-setup.dto';

export interface BoardRepository {
  createBoard(gameSetupDto: GameSetupDto);
  saveBoard(createdBoard);
  getBoard(id: number);
  deleteBoard(id: number);
}
