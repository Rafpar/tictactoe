import { IsNotEmpty } from 'class-validator';
import { IsTicTacToeSymbol } from '../decorators/symbol.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class GameSetupDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
  @ApiProperty()
  @IsNotEmpty()
  player1Name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsTicTacToeSymbol()
  player1Symbol: string;
  @ApiProperty()
  @IsNotEmpty()
  player2Name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsTicTacToeSymbol()
  player2Symbol: string;
}
