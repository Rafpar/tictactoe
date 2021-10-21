import { Player } from '../../players/dto/player';

export class GameInfoDto {
  players: Player[];
  boardId: number;
}
