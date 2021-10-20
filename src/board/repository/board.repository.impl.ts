import { BoardRepository } from './board.repository';
import { InjectModel } from '@nestjs/mongoose';
import { BoardDocument, BoardEntity } from '../schemas/board.schema';
import { Model } from 'mongoose';
import { CreateBoardDto } from '../dto/create-board.dto';

export class BoardRepositoryImpl implements BoardRepository {
  constructor(
    @InjectModel(BoardEntity.name) private boardModel: Model<BoardDocument>,
  ) {}

  createBoard() {
    return new this.boardModel(new CreateBoardDto());
  }

  async saveBoard(board) {
    return await board.save();
  }
  async getAllBoards(): Promise<BoardEntity[]> {
    return await this.boardModel.find().exec();
  }
  async getBoard() {
    return this.boardModel.findOne().exec();
  }
  async deleteBoard() {
    return await this.boardModel.deleteOne().exec();
  }
}
