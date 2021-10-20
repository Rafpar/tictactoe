import { BoardEntity } from '../schemas/board.schema';
import { Injectable } from '@nestjs/common';
import { GameSetupDto } from '../../game/dto/game-setup.dto';
import { BoardImpl } from './board.impl';
import { UpdateBoardDto } from '../dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(private readonly boardImpl: BoardImpl) {}

  async createBoard(gameSetupDto: GameSetupDto): Promise<BoardEntity> {
    return await this.boardImpl.createBoard(gameSetupDto);
  }

  async isGameStarted() {
    return await this.boardImpl.isGameStarted();
  }

  async renderBoard() {
    return await this.boardImpl.renderBoard();
  }

  async isBoardLocked(): Promise<boolean> {
    return await this.boardImpl.isBoardLocked();
  }

  async isFieldAlreadyFilled(fieldNumber: string): Promise<boolean> {
    return await this.boardImpl.isFieldAlreadyFilled(fieldNumber);
  }

  async isGameFinished(fieldNumber: string): Promise<boolean> {
    return await this.boardImpl.isGameFinished(fieldNumber);
  }

  async lockBoard() {
    await this.boardImpl.lockBoard();
  }

  async isWinner(fieldNumber: string): Promise<boolean> {
    return await this.boardImpl.isWinner(fieldNumber);
  }

  async updateBoard(fieldNumber: string, updateBoardDto: UpdateBoardDto) {
    return await this.boardImpl.updateBoard(fieldNumber, updateBoardDto);
  }

  async removeBoard() {
    return await this.boardImpl.removeBoard();
  }
}
