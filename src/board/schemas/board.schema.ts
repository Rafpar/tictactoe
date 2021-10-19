import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BoardDocument = Board & Document;

@Schema()
export class Board {
  @Prop()
  locked: boolean;
  @Prop()
  A1: string;
  @Prop()
  A2: string;
  @Prop()
  A3: string;
  @Prop()
  B1: string;
  @Prop()
  B2: string;
  @Prop()
  B3: string;
  @Prop()
  C1: string;
  @Prop()
  C2: string;
  @Prop()
  C3: string;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
