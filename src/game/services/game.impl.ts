import { BoardService } from '../../board/service/board.service';
import { Injectable } from '@nestjs/common';
import { GameSetupDto } from '../dto/game-setup.dto';
import { PlayersService } from '../../players/service/players.service';
import { Game } from '../interfaces/game';

@Injectable()
export class GameImpl implements Game {
  constructor(
    private readonly boardService: BoardService,
    private readonly playersService: PlayersService,
  ) {}
  async startGame(gameSetupDto: GameSetupDto) {
    return await this.boardService.createBoard(gameSetupDto);
  }
  async finishGame(boardId) {
    await this.boardService.removeBoard(boardId);
    await this.playersService.removePlayers(boardId);
    return;
  }
  isPlayersNamesTheSame(gameSetupDto: GameSetupDto) {
    return gameSetupDto.player1Name === gameSetupDto.player2Name;
  }
}
