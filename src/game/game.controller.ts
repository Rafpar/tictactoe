import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { GameService } from './game.service';
import { Response } from 'express';
import { GameSetupDto } from './dto/game-setup.dto';
import { BoardService } from '../board/board.service';

@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly boardService: BoardService,
  ) {}

  @Post('start')
  async create(
    @Body() gameSetupDto: GameSetupDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (await this.boardService.isGameStarted()) {
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
      res.status(HttpStatus.CREATED).json({ message: 'Game started' }).send();
    }
  }

  @Delete('finish')
  remove(@Res({ passthrough: true }) res: Response) {
    this.gameService.finishGame();
    res
      .status(HttpStatus.OK)
      .json({ message: 'Game finished, all data removed' })
      .send();
  }
}
