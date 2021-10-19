import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Players, PlayersDocument } from './schemas/players.schema';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel(Players.name) private playersModel: Model<PlayersDocument>,
  ) {}

  async removePlayers() {
    return await this.playersModel.deleteOne().exec();
  }

  async isCurrentPlayerTurn(currentPlayerName: string): Promise<boolean> {
    const players = await this.playersModel.findOne();
    return players.turn === currentPlayerName;
  }

  async setPlayerTurn(currenPlayerName: string) {
    const players = await this.playersModel.findOne();
    const names = [players.player1.name, players.player2.name];
    if (players.turn === currenPlayerName) {
      players.turn = names.filter((value) => {
        return value !== currenPlayerName;
      })[0];
      players.save();
    }
  }
  async getPlayerSymbol(playerName: string): Promise<string> {
    const playersDocuments = await this.playersModel.findOne();
    const players = [playersDocuments.player1, playersDocuments.player2];
    for (const player of players) {
      if (player.name === playerName) {
        return player.symbol;
      }
    }
  }
}
