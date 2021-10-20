import { BoardEntity } from '../schemas/board.schema';

export interface BoardRepository {
  createBoard();
  saveBoard(createdBoard);
  getAllBoards(): Promise<BoardEntity[]>;
  getBoard();
  deleteBoard();
}
