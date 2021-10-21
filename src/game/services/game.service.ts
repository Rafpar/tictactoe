import { Injectable } from '@nestjs/common';
import { GameSetupDto } from '../dto/game-setup.dto';
import { GameImpl } from './game.impl';

@Injectable()
export class GameService {
  constructor(private readonly gameImpl: GameImpl) {}
  startGame(gameSetupDto: GameSetupDto) {
    return this.gameImpl.startGame(gameSetupDto);
  }
  finishGame(boardId) {
    return this.gameImpl.finishGame(boardId);
  }
  isPlayersNamesTheSame(gameSetupDto: GameSetupDto) {
    return this.gameImpl.isPlayersNamesTheSame(gameSetupDto);
  }

  getGameInfo() {
    return this.gameImpl.getGameInfo();
  }
}
