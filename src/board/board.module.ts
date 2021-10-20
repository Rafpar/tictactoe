import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardEntity, BoardSchema } from './schemas/board.schema';
import { BoardService } from './service/board.service';
import {
  PlayersEntity,
  PlayersSchema,
} from '../players/schemas/players.schema';
import { PlayersModule } from '../players/players.module';
import { BoardImpl } from './service/board.impl';
import { BoardRepositoryImpl } from './repository/board.repository.impl';
import { PlayersRepositoryImpl } from '../players/repository/players.repository.impl';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BoardEntity.name, schema: BoardSchema }]),
    MongooseModule.forFeature([{ name: PlayersEntity.name, schema: PlayersSchema }]),
    PlayersModule,
  ],
  providers: [
    BoardService,
    BoardImpl,
    BoardRepositoryImpl,
    PlayersRepositoryImpl,
  ],
  exports: [BoardService],
})
export class BoardModule {}
