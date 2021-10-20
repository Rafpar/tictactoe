import { GameSetupDto } from '../../game/dto/game-setup.dto';
import { BoardEntity } from '../schemas/board.schema';
import { UpdateBoardDto } from '../dto/update-board.dto';

export interface Board {
  createBoard(gameSetupDto: GameSetupDto): Promise<BoardEntity>;
  getAllBoards(): Promise<BoardEntity[]>;
  isBoardAlreadyCreated(): Promise<boolean>;
  renderBoard();
  removeBoard();
  updateBoard(fieldNumber: string, updateBoardDto: UpdateBoardDto);
  isFieldAlreadyFilled(fieldNumber: string): Promise<boolean>;
  isGameFinished(fieldNumber: string): Promise<boolean>;
  isWinner(fieldNumber: string): Promise<boolean>;
  lockBoard();
  isBoardLocked(): Promise<boolean>;
  getWinCombinationsFor(fieldNumber: string);
  resolveWonCombination(winCombinations, fieldNumber, board);
  isDraw();
  isGameStarted();
  getAllWinCombinations();
}
