import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { BoardModule } from '../board/board.module';
import { GameService } from './game.service';
import { BoardController } from '../board/board.controller';
import { PlayersModule } from '../players/players.module';

@Module({
  imports: [BoardModule, PlayersModule],
  controllers: [GameController, BoardController],
  providers: [GameService],
})
export class GameModule {}
