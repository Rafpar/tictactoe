import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Res,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Response } from 'express';
import { PlayersService } from '../players/players.service';

@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly playersService: PlayersService,
  ) {}
  @Get()
  async getBoard(@Res({ passthrough: true }) res: Response) {
    if (!(await this.boardService.isGameStarted())) {
      res
        .status(HttpStatus.NOT_FOUND)
        .json({
          message: 'Game is not started, please start the game',
        })
        .send();
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
      res
        .status(HttpStatus.NOT_FOUND)
        .json({
          message: 'Game is not started, please start the game',
        })
        .send();
      return;
    }
    if (await this.boardService.isBoardLocked()) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({
          message: 'Board is locked!, Game is finished!',
        })
        .send();
      return;
    }
    if (
      !(await this.playersService.isCurrentPlayerTurn(
        updateBoardDto.playerName,
      ))
    ) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({
          message: 'It is not ' + updateBoardDto.playerName + ' turn',
        })
        .send();
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
          res
            .status(HttpStatus.OK)
            .json({
              message:
                'Game finished ' + updateBoardDto.playerName + ' won the game!',
            })
            .send();
          return;
        } else {
          res
            .status(HttpStatus.OK)
            .json({
              message: 'Game finished, it is a draw!',
            })
            .send();
        }
      }
      return board;
    } else {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({
          message:
            'Field ' +
            fieldNumber +
            ' already filled or does not exist, choose other field',
        })
        .send();
    }
  }
}
