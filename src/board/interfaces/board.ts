import { GameSetupDto } from '../../game/dto/game-setup.dto';
import { BoardEntity } from '../schemas/board.schema';
import { UpdateBoardDto } from '../dto/update-board.dto';

export interface Board {
  createBoard(gameSetupDto: GameSetupDto): Promise<BoardEntity>;
  isBoardAlreadyCreated(id: number): Promise<boolean>;
  renderBoard(boardId: number);
  removeBoard(boardId);
  updateBoard(fieldNumber: string, updateBoardDto: UpdateBoardDto, boardId: number);
  isFieldAlreadyFilled(fieldNumber: string, boardId: number): Promise<boolean>;
  isGameFinished(fieldNumber: string, boardId: number): Promise<boolean>;
  isWinner(fieldNumber: string, boardId: number): Promise<boolean>;
  lockBoard(boardId: number);
  isBoardLocked(boardId: number): Promise<boolean>;
  getWinCombinationsFor(fieldNumber: string);
  resolveWonCombination(winCombinations, fieldNumber, board);
  isDraw(boardId: number);
  isGameStarted(boardId: number);
  getAllWinCombinations();
}
