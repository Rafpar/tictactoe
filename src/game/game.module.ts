import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { BoardModule } from '../board/board.module';
import { GameService } from './services/game.service';
import { BoardController } from '../board/board.controller';
import { PlayersModule } from '../players/players.module';
import { GameServiceImpl } from './services/game.service.impl';

@Module({
  imports: [BoardModule, PlayersModule],
  controllers: [GameController, BoardController],
  providers: [GameService, GameServiceImpl],
})
export class GameModule {}
