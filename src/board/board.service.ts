import { InjectModel } from '@nestjs/mongoose';
import { Board, BoardDocument } from './schemas/board.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { Players, PlayersDocument } from '../players/schemas/players.schema';
import { CreatePlayersDto } from '../players/dto/create-players.dto';
import { GameSetupDto } from '../game/dto/game-setup.dto';
import { BoardUtils } from './dto/board-utils';
import { PlayersService } from '../players/players.service';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    @InjectModel(Players.name) private playersModel: Model<PlayersDocument>,
    private readonly playersService: PlayersService,
  ) {}

  async createBoard(gameSetupDto: GameSetupDto): Promise<Board> {
    const createdBoard = new this.boardModel(new CreateBoardDto());
    const createdPlayers = new this.playersModel(
      new CreatePlayersDto(gameSetupDto),
    );
    if (await this.isBoardAlreadyCreated()) {
      return;
    } else {
      await createdPlayers.save();
      await createdBoard.save();
    }
    return;
  }

  async getAllBoards(): Promise<Board[]> {
    return this.boardModel.find().exec();
  }

  async isBoardAlreadyCreated(): Promise<boolean> {
    return this.getAllBoards().then((value) => {
      return value.length > 0;
    });
  }

  async renderBoard() {
    const board = await this.boardModel.findOne();
    const boardUtils = new BoardUtils(board);
    return boardUtils.getBoard();
  }

  async removeBoard() {
    return await this.boardModel.deleteOne().exec();
  }

  async updateBoard(fieldNumber, updateBoardDto) {
    const board = await this.boardModel.findOne();
    board[fieldNumber] = await this.playersService.getPlayerSymbol(
      updateBoardDto.playerName,
    );
    await board.save();
    await this.playersService.setPlayerTurn(updateBoardDto.playerName);
    return board;
  }

  async isFieldAlreadyFilled(fieldNumber: string): Promise<boolean> {
    const board = await this.boardModel.findOne();
    return board[fieldNumber] !== null;
  }

  async isGameFinished(fieldNumber: string): Promise<boolean> {
    return (await this.isWinner(fieldNumber)) || (await this.isDraw());
  }

  async isWinner(fieldNumber: string): Promise<boolean> {
    const board = await this.boardModel.findOne();
    const winCombinations = this.getWinCombinationsFor(fieldNumber);
    const wonCombination = this.resolveWonCombination(
      winCombinations,
      fieldNumber,
      board,
    );
    return wonCombination.length === 1;
  }

  async lockBoard() {
    const board = await this.boardModel.findOne();
    board.locked = true;
    await board.save();
  }

  async isBoardLocked(): Promise<boolean> {
    const board = await this.boardModel.findOne();
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
    const board = await this.boardModel.findOne();
    const boardUtils = new BoardUtils(board);
    const emptyFieldsCount = boardUtils.getEmptyFieldsCount();
    return emptyFieldsCount === 0;
  }

  async isGameStarted() {
    const board = await this.boardModel.findOne();
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
