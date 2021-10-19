import { BoardService } from '../board/board.service';
import { Injectable } from '@nestjs/common';
import { GameSetupDto } from './dto/game-setup.dto';
import { PlayersService } from '../players/players.service';

@Injectable()
export class GameService {
  constructor(
    private readonly boardService: BoardService,
    private readonly playersService: PlayersService,
  ) {}
  startGame(gameSetupDto: GameSetupDto) {
    return this.boardService.createBoard(gameSetupDto);
  }
  finishGame() {
    this.boardService.removeBoard();
    this.playersService.removePlayers();
    return;
  }
  isPlayersNamesTheSame(gameSetupDto: GameSetupDto) {
    return gameSetupDto.player1Name === gameSetupDto.player2Name;
  }
}
