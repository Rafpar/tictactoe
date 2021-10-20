import { BoardEntity } from '../schemas/board.schema';
import { Injectable } from '@nestjs/common';
import { GameSetupDto } from '../../game/dto/game-setup.dto';
import { BoardServiceImpl } from './board.service.impl';
import { UpdateBoardDto } from '../dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(private readonly boardServiceImpl: BoardServiceImpl) {}

  async createBoard(gameSetupDto: GameSetupDto): Promise<BoardEntity> {
    return await this.boardServiceImpl.createBoard(gameSetupDto);
  }

  async isGameStarted() {
    return await this.boardServiceImpl.isGameStarted();
  }

  async renderBoard() {
    return await this.boardServiceImpl.renderBoard();
  }

  async isBoardLocked(): Promise<boolean> {
    return await this.boardServiceImpl.isBoardLocked();
  }

  async isFieldAlreadyFilled(fieldNumber: string): Promise<boolean> {
    return await this.boardServiceImpl.isFieldAlreadyFilled(fieldNumber);
  }

  async isGameFinished(fieldNumber: string): Promise<boolean> {
    return await this.boardServiceImpl.isGameFinished(fieldNumber);
  }

  async lockBoard() {
    await this.boardServiceImpl.lockBoard();
  }

  async isWinner(fieldNumber: string): Promise<boolean> {
    return await this.boardServiceImpl.isWinner(fieldNumber);
  }

  async updateBoard(fieldNumber: string, updateBoardDto: UpdateBoardDto) {
    return await this.boardServiceImpl.updateBoard(fieldNumber, updateBoardDto);
  }

  async removeBoard() {
    return await this.boardServiceImpl.removeBoard();
  }
}
