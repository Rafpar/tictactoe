import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Players, PlayersSchema } from './schemas/players.schema';
import { PlayersService } from './players.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Players.name, schema: PlayersSchema }]),
  ],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}
