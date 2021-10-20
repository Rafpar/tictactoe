import { Injectable } from '@nestjs/common';
import { PlayersImpl } from './players.impl';

@Injectable()
export class PlayersService {
  constructor(private readonly playersImpl: PlayersImpl) {}

  async removePlayers() {
    return await this.playersImpl.removePlayers();
  }

  async isCurrentPlayerTurn(currentPlayerName: string): Promise<boolean> {
    return await this.playersImpl.isCurrentPlayerTurn(currentPlayerName);
  }

  async setPlayerTurn(currenPlayerName: string) {
    return await this.playersImpl.setPlayerTurn(currenPlayerName);
  }

  async getPlayerSymbol(playerName: string): Promise<string> {
    return await this.playersImpl.getPlayerSymbol(playerName);
  }
}
