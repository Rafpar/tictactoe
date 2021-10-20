import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Res,
} from '@nestjs/common';
import { BoardService } from './service/board.service';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Response } from 'express';
import { PlayersService } from '../players/service/players.service';

@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly playersService: PlayersService,
  ) {}
  @Get()
  async getBoard(@Res({ passthrough: true }) res: Response) {
    if (!(await this.boardService.isGameStarted())) {
      const message = 'Game is not started, please start the game';
      this.sendResponse(res, HttpStatus.NOT_FOUND, message);
      return;
    } else {
      return this.boardService.renderBoard();
    }
  }

  @Patch('field/:number')
  async updateField(
    @Param('number') fieldNumber: string,
    @Body() updateBoardDto: UpdateBoardDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!(await this.boardService.isGameStarted())) {
      const message = 'Game is not started, please start the game';
      this.sendResponse(res, HttpStatus.NOT_FOUND, message);
      return;
    }
    if (await this.boardService.isBoardLocked()) {
      const message = 'Board is locked!, Game is finished!';
      this.sendResponse(res, HttpStatus.BAD_REQUEST, message);
      return;
    }
    if (
      !(await this.playersService.isCurrentPlayerTurn(
        updateBoardDto.playerName,
      ))
    ) {
      const message = 'It is not ' + updateBoardDto.playerName + ' turn';
      this.sendResponse(res, HttpStatus.BAD_REQUEST, message);
      return;
    }
    if (!(await this.boardService.isFieldAlreadyFilled(fieldNumber))) {
      const board = await this.boardService.updateBoard(
        fieldNumber,
        updateBoardDto,
      );
      if (await this.boardService.isGameFinished(fieldNumber)) {
        await this.boardService.lockBoard();
        if (await this.boardService.isWinner(fieldNumber)) {
          const message = 'Game finished ' + updateBoardDto.playerName + ' won the game!';
          this.sendResponse(res, HttpStatus.OK, message);
          return; }
        else {
          const message = 'Game finished, it is a draw!';
          this.sendResponse(res, HttpStatus.OK, message);
          return;
        }
      }
      return board; }
    else {
      const message = 'Field ' + fieldNumber + ' already filled or does not exist, choose other field';
      this.sendResponse(res, HttpStatus.BAD_REQUEST, message);
    }
  }
  sendResponse(res: Response, httpStatus: HttpStatus, message: string) {
    res
      .status(httpStatus)
      .json({
        message: message,
      })
      .send();
  }
}
