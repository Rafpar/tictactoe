import {
  Body,
  Controller,
  Delete, Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { GameService } from './services/game.service';
import { Response } from 'express';
import { GameSetupDto } from './dto/game-setup.dto';
import { BoardService } from '../board/service/board.service';

@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly boardService: BoardService,
  ) {}

  @Get('info')
  async gameInfo(){
    return this.gameService.getGameInfo();
  }

  @Post('start')
  async create(
    @Body() gameSetupDto: GameSetupDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (await this.boardService.isGameStarted(gameSetupDto.id)) {
      res
        .status(HttpStatus.OK)
        .json({
          message: 'Game is already started, continue or finish current game',
        })
        .send();
      return;
    }
    if (this.gameService.isPlayersNamesTheSame(gameSetupDto)) {
      res
        .status(HttpStatus.OK)
        .json({
          message: 'Players names are the same, please use different names!',
        })
        .send();
      return;
    } else {
      await this.gameService.startGame(gameSetupDto);
      res.status(HttpStatus.CREATED).json({ message: 'Game started with id ' + gameSetupDto.id }).send();
      return;
    }
  }

  @Delete('finish/:id')
  async remove(
    @Param('id') boardId: number,
    @Res({ passthrough: true }) res: Response) {
    if (await this.boardService.isGameStarted(boardId)) {
      await this.gameService.finishGame(boardId);
      res
        .status(HttpStatus.OK)
        .json({ message: 'Game wit id ' + boardId + ' finished, all data removed' })
        .send();
      return;
    } else {
      res
        .status(HttpStatus.OK)
        .json({ message: 'Game with id ' + boardId + ' not started yet' })
        .send();
      return;
    }
  }
}
