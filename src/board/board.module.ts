import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardEntity, BoardSchema } from './schemas/board.schema';
import { BoardService } from './service/board.service';
import { Players, PlayersSchema } from '../players/schemas/players.schema';
import { PlayersModule } from '../players/players.module';
import { BoardServiceImpl } from './service/board.service.impl';
import { BoardRepositoryImpl } from './repository/board.repository.impl';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BoardEntity.name, schema: BoardSchema }]),
    MongooseModule.forFeature([{ name: Players.name, schema: PlayersSchema }]),
    PlayersModule,
  ],
  providers: [BoardService, BoardServiceImpl, BoardRepositoryImpl],
  exports: [BoardService],
})
export class BoardModule {}
