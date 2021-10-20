import { Injectable } from '@nestjs/common';
import { GameSetupDto } from '../dto/game-setup.dto';
import { GameServiceImpl } from './game.service.impl';

@Injectable()
export class GameService {
  constructor(private readonly gameServiceImpl: GameServiceImpl) {}
  startGame(gameSetupDto: GameSetupDto) {
    return this.gameServiceImpl.startGame(gameSetupDto);
  }
  finishGame() {
    return this.gameServiceImpl.finishGame();
  }
  isPlayersNamesTheSame(gameSetupDto: GameSetupDto) {
    return this.gameServiceImpl.isPlayersNamesTheSame(gameSetupDto);
  }
}
