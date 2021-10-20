import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersEntity, PlayersSchema } from './schemas/players.schema';
import { PlayersService } from './service/players.service';
import { PlayersServiceImpl } from './service/players.service.impl';
import { PlayersRepositoryImpl } from './repository/players.repository.impl';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PlayersEntity.name, schema: PlayersSchema }]),
  ],
  providers: [PlayersService, PlayersServiceImpl, PlayersRepositoryImpl],
  exports: [PlayersService, PlayersRepositoryImpl],
})
export class PlayersModule {}
