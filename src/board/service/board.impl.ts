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
    if (await this.isBoardAlreadyCreated()) {
      return;
    } else {
      await this.playersRepository.savePlayers(createdPlayers);
      await this.boardRepository.saveBoard(createdBoard);
    }
    return;
  }

  async getAllBoards(): Promise<BoardEntity[]> {
    return await this.boardRepository.getAllBoards();
  }

  async isBoardAlreadyCreated(): Promise<boolean> {
    return this.getAllBoards().then((value) => {
      return value.length > 0;
    });
  }

  async renderBoard() {
    const board = await this.boardRepository.getBoard();
    const boardUtils = new BoardUtils(board);
    return boardUtils.getBoard();
  }

  async removeBoard() {
    return await this.boardRepository.deleteBoard();
  }

  async updateBoard(fieldNumber: string, updateBoardDto: UpdateBoardDto) {
    const board = await this.boardRepository.getBoard();
    board[fieldNumber] = await this.playersService.getPlayerSymbol(
      updateBoardDto.playerName,
    );
    await this.boardRepository.saveBoard(board);
    await this.playersService.setPlayerTurn(updateBoardDto.playerName);
    return board;
  }

  async isFieldAlreadyFilled(fieldNumber: string): Promise<boolean> {
    const board = await this.boardRepository.getBoard();
    return board[fieldNumber] !== null;
  }

  async isGameFinished(fieldNumber: string): Promise<boolean> {
    return (await this.isWinner(fieldNumber)) || (await this.isDraw());
  }

  async isWinner(fieldNumber: string): Promise<boolean> {
    const board = await this.boardRepository.getBoard();
    const winCombinations = this.getWinCombinationsFor(fieldNumber);
    const wonCombination = this.resolveWonCombination(
      winCombinations,
      fieldNumber,
      board,
    );
    return wonCombination.length === 1;
  }

  async lockBoard() {
    const board = await this.boardRepository.getBoard();
    board.locked = true;
    await this.boardRepository.saveBoard(board);
  }

  async isBoardLocked(): Promise<boolean> {
    const board = await this.boardRepository.getBoard();
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

  async isDraw() {
    const board = await this.boardRepository.getBoard();
    const boardUtils = new BoardUtils(board);
    const emptyFieldsCount = boardUtils.getEmptyFieldsCount();
    return emptyFieldsCount === 0;
  }

  async isGameStarted() {
    const board = await this.boardRepository.getBoard();
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
