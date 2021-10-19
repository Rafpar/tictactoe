import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from './schemas/board.schema';
import { BoardService } from './board.service';
import { Players, PlayersSchema } from '../players/schemas/players.schema';
import { PlayersModule } from '../players/players.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]),
    MongooseModule.forFeature([{ name: Players.name, schema: PlayersSchema }]),
    PlayersModule,
  ],
  providers: [BoardService],
  exports: [BoardService],
})
export class BoardModule {}
