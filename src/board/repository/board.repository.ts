import { BoardEntity } from '../schemas/board.schema';
import { GameSetupDto } from '../../game/dto/game-setup.dto';

export interface BoardRepository {
  createBoard(gameSetupDto: GameSetupDto);
  saveBoard(createdBoard);
  getAllBoards(): Promise<BoardEntity[]>;
  getBoard();
  deleteBoard();
}
