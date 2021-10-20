import { Injectable } from '@nestjs/common';
import { PlayersServiceImpl } from './players.service.impl';

@Injectable()
export class PlayersService {
  constructor(private readonly playersServiceImpl: PlayersServiceImpl) {}

  async removePlayers() {
    return await this.playersServiceImpl.removePlayers();
  }

  async isCurrentPlayerTurn(currentPlayerName: string): Promise<boolean> {
    return await this.playersServiceImpl.isCurrentPlayerTurn(currentPlayerName);
  }

  async setPlayerTurn(currenPlayerName: string) {
    return await this.playersServiceImpl.setPlayerTurn(currenPlayerName);
  }

  async getPlayerSymbol(playerName: string): Promise<string> {
    return await this.playersServiceImpl.getPlayerSymbol(playerName);
  }
}
