import { PlayersRepository } from './players.repository';
import { InjectModel } from '@nestjs/mongoose';
import { PlayersDocument, PlayersEntity } from '../schemas/players.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreatePlayersDto } from '../dto/create-players.dto';
import { GameSetupDto } from '../../game/dto/game-setup.dto';

@Injectable()
export class PlayersRepositoryImpl implements PlayersRepository {
  constructor(
    @InjectModel(PlayersEntity.name)
    private playersModel: Model<PlayersDocument>,
  ) {}

  async deletePlayers(playersId: number) {
    return await this.playersModel.findByIdAndDelete(playersId).exec();
  }
  async findPlayers(playersId: number) {
    return this.playersModel.findById(playersId);
  }
  async savePlayers(players) {
    return await players.save();
  }
  createPlayers(gameSetupDto: GameSetupDto) {
    return new this.playersModel(new CreatePlayersDto(gameSetupDto));
  }
}
