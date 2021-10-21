import { Injectable } from '@nestjs/common';
import { Players } from '../interfaces/players';
import { PlayersRepositoryImpl } from '../repository/players.repository.impl';

@Injectable()
export class PlayersImpl implements Players {
  constructor(private readonly playersRepository: PlayersRepositoryImpl) {}

  async removePlayers(playersId: number) {
    return await this.playersRepository.deletePlayers(playersId);
  }

  async isCurrentPlayerTurn(currentPlayerName: string, playersId: number): Promise<boolean> {
    const players = await this.playersRepository.findPlayers(playersId);
    return players.turn === currentPlayerName;
  }

  async setPlayerTurn(currenPlayerName: string, playersId: number) {
    const players = await this.playersRepository.findPlayers(playersId);
    const names = [players.player1.name, players.player2.name];
    if (players.turn === currenPlayerName) {
      players.turn = names.filter((value) => {
        return value !== currenPlayerName;
      })[0];
      await this.playersRepository.savePlayers(players);
    }
  }
  async getPlayerSymbol(playerName: string, playersId: number): Promise<string> {
    const playersDocuments = await this.playersRepository.findPlayers(playersId);
    const players = [playersDocuments.player1, playersDocuments.player2];
    for (const player of players) {
      if (player.name === playerName) {
        return player.symbol;
      }
    }
  }
  async getAllPlayers(){
    return await this.playersRepository.getAllPlayers();
  }
}
