import { Injectable } from '@nestjs/common';
import { PlayersImpl } from './players.impl';

@Injectable()
export class PlayersService {
  constructor(private readonly playersImpl: PlayersImpl) {}

  async removePlayers(playersId: number) {
    return await this.playersImpl.removePlayers(playersId);
  }

  async isCurrentPlayerTurn(currentPlayerName: string, playersId: number): Promise<boolean> {
    return await this.playersImpl.isCurrentPlayerTurn(currentPlayerName, playersId);
  }

  async setPlayerTurn(currenPlayerName: string, playersId: number) {
    return await this.playersImpl.setPlayerTurn(currenPlayerName, playersId);
  }

  async getPlayerSymbol(playerName: string, playersId: number): Promise<string> {
    return await this.playersImpl.getPlayerSymbol(playerName, playersId);
  }

  async getAllPlayers(){
    return await this.playersImpl.getAllPlayers();
  }
}
