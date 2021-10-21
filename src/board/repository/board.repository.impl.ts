import { BoardRepository } from './board.repository';
import { InjectModel } from '@nestjs/mongoose';
import { BoardDocument, BoardEntity } from '../schemas/board.schema';
import { Model } from 'mongoose';
import { CreateBoardDto } from '../dto/create-board.dto';
import { GameSetupDto } from '../../game/dto/game-setup.dto';

export class BoardRepositoryImpl implements BoardRepository {
  constructor(
    @InjectModel(BoardEntity.name) private boardModel: Model<BoardDocument>,
  ) {}

  createBoard(gameSetupDto: GameSetupDto) {
    return new this.boardModel(new CreateBoardDto(gameSetupDto));
  }

  async saveBoard(board) {
    return await board.save();
  }
  async getBoard(id) {
    return this.boardModel.findById(id).exec();
  }
  async deleteBoard(id) {
    return await this.boardModel.findByIdAndDelete(id).exec();
  }
}
