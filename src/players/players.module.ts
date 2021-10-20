import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersEntity, PlayersSchema } from './schemas/players.schema';
import { PlayersService } from './service/players.service';
import { PlayersImpl } from './service/players.impl';
import { PlayersRepositoryImpl } from './repository/players.repository.impl';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PlayersEntity.name, schema: PlayersSchema }]),
  ],
  providers: [PlayersService, PlayersImpl, PlayersRepositoryImpl],
  exports: [PlayersService, PlayersRepositoryImpl],
})
export class PlayersModule {}
