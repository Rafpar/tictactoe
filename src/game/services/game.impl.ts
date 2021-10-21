import { BoardService } from '../../board/service/board.service';
import { Injectable } from '@nestjs/common';
import { GameSetupDto } from '../dto/game-setup.dto';
import { PlayersService } from '../../players/service/players.service';
import { Game } from '../interfaces/game';
import { GameInfoDto } from '../dto/game.info.dto';

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

  async getGameInfo() {
    const players = await this.playersService.getAllPlayers();
    return players.map((item) => {
      const game = new GameInfoDto();
      game.players = [item.player1, item.player2];
      game.boardId = item._id;
      return game;
    });
  }
}
