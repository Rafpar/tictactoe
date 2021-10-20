import { Injectable } from '@nestjs/common';
import { Players } from '../interfaces/Players';
import { PlayersRepositoryImpl } from '../repository/players.repository.impl';

@Injectable()
export class PlayersServiceImpl implements Players {
  constructor(private readonly playersRepository: PlayersRepositoryImpl) {}

  async removePlayers() {
    return await this.playersRepository.deletePlayers();
  }

  async isCurrentPlayerTurn(currentPlayerName: string): Promise<boolean> {
    const players = await this.playersRepository.findPlayers();
    return players.turn === currentPlayerName;
  }

  async setPlayerTurn(currenPlayerName: string) {
    const players = await this.playersRepository.findPlayers();
    const names = [players.player1.name, players.player2.name];
    if (players.turn === currenPlayerName) {
      players.turn = names.filter((value) => {
        return value !== currenPlayerName;
      })[0];
      await this.playersRepository.savePlayers(players);
    }
  }
  async getPlayerSymbol(playerName: string): Promise<string> {
    const playersDocuments = await this.playersRepository.findPlayers();
    const players = [playersDocuments.player1, playersDocuments.player2];
    for (const player of players) {
      if (player.name === playerName) {
        return player.symbol;
      }
    }
  }
}
