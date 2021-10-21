import { Board } from '../interfaces/board';
import { BoardEntity } from '../schemas/board.schema';
import { PlayersService } from '../../players/service/players.service';
import { GameSetupDto } from '../../game/dto/game-setup.dto';
import { BoardUtils } from '../utils/board-utils';
import { Injectable } from '@nestjs/common';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { BoardRepositoryImpl } from '../repository/board.repository.impl';
import { PlayersRepositoryImpl } from '../../players/repository/players.repository.impl';

@Injectable()
export class BoardImpl implements Board {
  constructor(
    private readonly playersRepository: PlayersRepositoryImpl,
    private readonly boardRepository: BoardRepositoryImpl,
    private readonly playersService: PlayersService,
  ) {}

  async createBoard(gameSetupDto: GameSetupDto): Promise<BoardEntity> {
    const createdBoard = this.boardRepository.createBoard(gameSetupDto);
    const createdPlayers = this.playersRepository.createPlayers(gameSetupDto);
    if (await this.isBoardAlreadyCreated(gameSetupDto.id)) {
      return;
    } else {
      await this.playersRepository.savePlayers(createdPlayers);
      await this.boardRepository.saveBoard(createdBoard);
    }
    return;
  }

  async isBoardAlreadyCreated(boardId): Promise<boolean> {
    return (await this.boardRepository.getBoard(boardId)) !== null;
  }

  async renderBoard(boardId) {
    const board = await this.boardRepository.getBoard(boardId);
    const boardUtils = new BoardUtils(board);
    return boardUtils.getBoard();
  }

  async removeBoard(boardId) {
    return await this.boardRepository.deleteBoard(boardId);
  }

  async updateBoard(fieldNumber: string, updateBoardDto: UpdateBoardDto, boardId: number) {
    const board = await this.boardRepository.getBoard(boardId);
    board[fieldNumber] = await this.playersService.getPlayerSymbol(
      updateBoardDto.playerName,
      boardId,
    );
    await this.boardRepository.saveBoard(board);
    await this.playersService.setPlayerTurn(updateBoardDto.playerName, boardId);
    return board;
  }

  async isFieldAlreadyFilled(fieldNumber: string, boardId: number): Promise<boolean> {
    const board = await this.boardRepository.getBoard(boardId);
    return board[fieldNumber] !== null;
  }

  async isGameFinished(fieldNumber: string, boardId: number): Promise<boolean> {
    return (
      (await this.isWinner(fieldNumber, boardId)) ||
      (await this.isDraw(boardId))
    );
  }

  async isWinner(fieldNumber: string, boardId: number): Promise<boolean> {
    const board = await this.boardRepository.getBoard(boardId);
    const winCombinations = this.getWinCombinationsFor(fieldNumber);
    const wonCombination = this.resolveWonCombination(
      winCombinations,
      fieldNumber,
      board,
    );
    return wonCombination.length === 1;
  }

  async lockBoard(boardId: number) {
    const board = await this.boardRepository.getBoard(boardId);
    board.locked = true;
    await this.boardRepository.saveBoard(board);
  }

  async isBoardLocked(boardId: number): Promise<boolean> {
    const board = await this.boardRepository.getBoard(boardId);
    return board.locked;
  }

  getWinCombinationsFor(fieldNumber: string) {
    const fieldWinCombinations = [];
    const allWinCombinations = this.getAllWinCombinations();
    for (const combination of allWinCombinations) {
      if (combination.includes(fieldNumber)) {
        fieldWinCombinations.push(combination);
      }
    }
    return fieldWinCombinations;
  }

  resolveWonCombination(winCombinations, fieldNumber, board) {
    const wonCombination = [];
    winCombinations.forEach((combination) => {
      let symbolCount = 0;
      for (const field of combination) {
        if (board[field] === board[fieldNumber]) {
          symbolCount++;
        }
        if (symbolCount === 3) {
          wonCombination.push(combination);
        }
      }
    });
    return wonCombination;
  }

  async isDraw(boardId: number) {
    const board = await this.boardRepository.getBoard(boardId);
    const boardUtils = new BoardUtils(board);
    const emptyFieldsCount = boardUtils.getEmptyFieldsCount();
    return emptyFieldsCount === 0;
  }

  async isGameStarted(boardId: number) {
    const board = await this.boardRepository.getBoard(boardId);
    return board !== null;
  }

  getAllWinCombinations() {
    const combination1 = ['A1', 'A2', 'A3'];
    const combination2 = ['B1', 'B2', 'B3'];
    const combination3 = ['C1', 'C2', 'C3'];
    const combination4 = ['A1', 'B1', 'C1'];
    const combination5 = ['A2', 'B2', 'C2'];
    const combination6 = ['A3', 'B3', 'C3'];
    const combination7 = ['A1', 'B2', 'C3'];
    const combination8 = ['A3', 'B2', 'C1'];
    return [
      combination1,
      combination2,
      combination3,
      combination4,
      combination5,
      combination6,
      combination7,
      combination8,
    ];
  }
}
