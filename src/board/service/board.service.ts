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

  async isGameStarted(boardId: number) {
    return await this.boardImpl.isGameStarted(boardId);
  }

  async renderBoard(boardId) {
    return await this.boardImpl.renderBoard(boardId);
  }

  async isBoardLocked(boardId: number): Promise<boolean> {
    return await this.boardImpl.isBoardLocked(boardId);
  }

  async isFieldAlreadyFilled(fieldNumber: string, boardId: number): Promise<boolean> {
    return await this.boardImpl.isFieldAlreadyFilled(fieldNumber, boardId);
  }

  async isGameFinished(fieldNumber: string, boardId: number): Promise<boolean> {
    return await this.boardImpl.isGameFinished(fieldNumber, boardId);
  }

  async lockBoard(boardId: number) {
    await this.boardImpl.lockBoard(boardId);
  }

  async isWinner(fieldNumber: string, boardId: number): Promise<boolean> {
    return await this.boardImpl.isWinner(fieldNumber, boardId);
  }

  async updateBoard(fieldNumber: string, updateBoardDto: UpdateBoardDto, boardId) {
    return await this.boardImpl.updateBoard(fieldNumber, updateBoardDto, boardId);
  }

  async removeBoard(boardId: number) {
    return await this.boardImpl.removeBoard(boardId);
  }
}
