import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Player } from '../dto/player';

export type PlayersDocument = PlayersEntity & Document;
@Schema()
export class PlayersEntity {
  @Prop()
  player1: Player;
  @Prop()
  player2: Player;
  @Prop()
  turn: string;
}

export const PlayersSchema = SchemaFactory.createForClass(PlayersEntity);
